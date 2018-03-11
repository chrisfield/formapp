import React from 'react';
import {Field, FieldArray, FormStatus, Formkit} from 'redux-formkit';

import './ExampleForm.css';

const upper = str => str.toUpperCase();
const number = str => {
  const result = parseInt(str.replace(/[^\d.-]/g, ""), 10);;
  return result;
}
const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

const maxLength5 = (value, values) => (
  value.trim && value.trim().length > 5 ? 'maxLength': undefined
);


const required = value => (
  value.trim && value.trim().length > 0 ? undefined: 'required'
);

const requiredNum = value => {
  if (isNaN(value)) {
    return 'required';
  }
  return undefined;
};


const greaterThanField1 = (value, values) => (
  values && value > values.field1? undefined: 'greaterThanField1'
);

const validateF2 = form => {
  const field2 = form.getField('field2');
  field2.validateValue(field2.props.value)
}

const Input = props => (
   <div className="example-form_item">
     <label htmlFor={props.name} className="example-form_field-label">{props.label}</label>
     <input placeholder={props.placeholder} value={props.value} onChange={props.update} onBlur={props.validate}/>
     {props.error && props.touched && <p>{props.error}</p>}
   </div>
);

const InputField = props => (
  <Field component={Input} {...props} />
);

const Checkbox = props => (
  <div className="example-form_item">
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} type="checkbox" checked={props.value} onChange={props.update}/>
  </div>
);

const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
     <div className="example-form_item">
      <label htmlFor={id}>{props.label}</label>
      <input id={id} type="radio" value={props.radioValue} checked={props.radioValue===props.value} onChange={props.update}/>
    </div>
  );
};

const Cbox = props => (
  <Field name={props.name} component={Checkbox} label={props.label} form={props.form} />
);

const Rbox = props => (
  <Field name={props.name} radioValue={props.rvalue} component={RadioButton} label={props.label} form={props.form} />
);


const renderHobbies = ({form, fields, error}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) => (
      <li key={hobby}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        >-</button>
        hobby: {JSON.stringify(hobby)}
        <Field
          form={form}
          name={`${hobby}.description`}
          type="text"
          component={Input}
          validate={required}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const ExampleForm = (props) => (
  <form className="example-form">
    <fieldset>
      <legend className="example-form_title">
        Example form
      </legend>
      <div className="example-form_items">
        <InputField label="First Field" name="field1" onValidate={validateF2} form={props.form} validate={[required, maxLength5]} />

        <InputField label="2nd Field > 1st field" name="field2" form={props.form} validate={greaterThanField1}/>
        <Field label="isAgreed" name="isAgreed" component={Checkbox} form={props.form} />
        <Cbox name="isAdditionalField" label="Is Additional Field?" form={props.form} />
        {  
          props.form.fieldValues().isAdditionalField 
          && <Field component="input" name="additionalField" placeholder="Additional field" form={props.form}/>
        }
        <div className="example-form_item">
          <Rbox name="rb2" label="Red" rvalue="R" form={props.form} />
          <Rbox name="rb2" label="Green" rvalue="G" form={props.form} />
          <Rbox name="rb2" label="Blue" rvalue="B" form={props.form} />
        </div>
        <InputField
          label="Numeric Field"
          form={props.form}
          name="theNumber"
          format={number}
          formatFromStore={addCommas}
          validate={requiredNum}
        />
        <InputField
          label="Uppercase Field"
          form={props.form}
          name="hob"
          type="text"
          format={upper}
        />

        <div className="example-form_item">
          <FormStatus form={props.form}>
            {({isValid, errorCount}) => {
              return(
                <button onClick={props.form.submit} className="example-form_button" disabled={false}>
                  Send {isValid? ':)': `(Todo: ${errorCount})`}
                </button>
              )
            }}
          </FormStatus>
        </div>
       </div>
      </fieldset>

    <div>
      <label>Hobbies</label>
      <FieldArray
        form={props.form}
        name="hobbies"
        component={renderHobbies}
      />
    </div>
  </form>  
);

const validate = values => {console.log("validate", values);}

export default Formkit(ExampleForm, 'exampleF', validate);


