import React from "react";
import client from "part:@sanity/base/client";
import PatchEvent, {set, unset, setIfMissing} from "part:@sanity/form-builder/patch-event";
import {FormBuilderInput} from "part:@sanity/form-builder";
import Select from "part:@sanity/components/selects/default";
import Fieldset from "part:@sanity/components/fieldsets/default";
import FormField from "part:@sanity/components/formfields/default";
import Spinner from "part:@sanity/components/loading/spinner";

const EMPTY = {title: "", value: undefined};
const getProduct = (value = {}) => value && value.product && value.product._ref;

export default class ProductReferenceObjectInput extends React.Component {
	state = {options: [], fetching: false};

	constructor(props) {
		super(props);

		if (getProduct(props.value)) {
			this.fetchOptions();
		}
	}

	componentWillUnmount() {
		if (this.fetchOptions$) {
			this.fetchOptions$.unsubscribe();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const prevProd = getProduct(prevProps.value);
		const nextProd = getProduct(this.props.value);

		if (prevProd !== nextProd) {
			this.fetchOptions();
		}
	}

	fetchOptions = () => {
		const product = getProduct(this.props.value);
		if (!product) {
			this.setState({options: [], fetching: false});
			return;
		}

		this.setState({fetching: true});
		this.fetchOptions$ = client.observable.fetch("*[_id == $product][0].options", {product}).subscribe(options =>
			this.setState({
				options: Array.isArray(options) ? options : [],
				fetching: false
			})
		);
	};

	handleFieldChange = (field, fieldPatchEvent) => {
		const {onChange, type} = this.props;
		// Whenever the field input emits a patch event, we need to make sure to each of the included patches
		// are prefixed with its field name, e.g. going from:
		// {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
		// and ensure this input's value exists
		let patchEvent = fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name}));

		// If we're changing the product reference, also unset the option
		if (field.name === "product") {
			patchEvent = patchEvent.append(unset(["unit"]));
			this.setState({options: [], fetching: false});
		}

		onChange(patchEvent);
	};

	handleUnitChange = ({value}) => {
		const {onChange} = this.props;
		const {options} = this.state;
		const selected = options.find(opt => opt._key === value);
		onChange(PatchEvent.from(set(selected, ["unit"])));
	};

	renderField(field, level) {
		const {onFocus, onBlur, readOnly, focusPath, filterField, value} = this.props;
		const {type} = field;
		console.log("field", field);
		if (field.name !== "unit") {
			return (
				<FormBuilderInput
					key={field.name}
					value={value && value[field.name]}
					type={field.type}
					onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
					path={[field.name]}
					onFocus={onFocus}
					onBlur={onBlur}
					readOnly={readOnly || type.readOnly}
					focusPath={focusPath}
					filterField={filterField}
					level={level}
				/>
			);
		}

		const {options, fetching} = this.state;
		const selectedKey = value && value.unit && value.unit._key;
		const listOptions = options.map(opt => ({value: opt._key, title: opt.unitType}));
		const selected = listOptions.find(opt => opt.value === selectedKey) || EMPTY;
		return (
			<FormField label={type.title} level={level} description={type.description}>
				{fetching ? (
					<Spinner />
				) : (
					<Select
						label={type.title}
						value={selected}
						placeholder={type.placeholder}
						onChange={this.handleUnitChange}
						onFocus={onFocus}
						items={[EMPTY].concat(listOptions)}
					/>
				)}
			</FormField>
		);
	}

	render() {
		const {type, level} = this.props;
		return (
			// <Fieldset level={level} legend={type.title} description={type.description}>
			<section>{(type.fields || []).map((field, i) => this.renderField(field, level + 1, i))}</section>
			// </Fieldset>
		);
	}
}
