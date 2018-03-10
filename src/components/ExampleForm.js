import React from 'react';
import {Field, FieldArray, FormStatus, Formkit} from 'redux-formkit';

import './ExampleForm.css';

const maxLength5 = (value, values) => (
  value.trim && value.trim().length > 5 ? 'maxLength': undefined
);

const maxLength1 = value => (
  value.trim && value.trim().length > 1 ? 'maxLength': undefined
);

const required = value => (
  value.trim && value.trim().length > 0 ? undefined: 'required'
);

const greaterThanField1 = (value, values) => (
  values && value > values.field1? undefined: 'greaterThanField1'
);

const validateF2 = form => {
  const field2 = form.getField('field2');
  field2.validateValue(field2.props.value)
}

const requiredMaxLength1 = [required, maxLength1];

const Input = props => (
   <div>
     {props.label}
     <input placeholder={props.placeholder} value={props.value} onChange={props.update} onBlur={props.validate}/>
     {props.error && props.touched && <p>{props.error}</p>}
   </div>
);

const Checkbox = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} type="checkbox" checked={props.value} onChange={props.update}/>
  </div>
);

const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
     <div>
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
    fields: {JSON.stringify(fields)}
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) => (
      <li key={hobby}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
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
)

const renderInput = ({update, validate, value, error, touched}) => (
  <div>
    <input id="f1" className="example-form_input" value={value} onChange={update} onBlur={validate} />
    {error && touched && <p>{error}</p>}
  </div>
);

const ExampleForm = (props) => (
  <form className="example-form">
    <fieldset>
      <legend className="example-form_title">
        Example form
      </legend>
      <ul className="example-form_items">
        <li className="example-form_item">
          <label htmlFor="f1" className="example-form_field-label">
            First Field
          </label>
          <Field name="field1" onValidate={validateF2} form={props.form} validate={requiredMaxLength1}>
            {renderInput}
          </Field>
        </li>
        <li className="example-form_item">
          <label htmlFor="f2" className="example-form_field-label">
            Second Field
          </label>
          <Field name="field2" component={Input} form={props.form} validate={greaterThanField1}/>
        </li>
        <li className="example-form_item">
          <label htmlFor="cb1" className="example-form_field-label">
            Is Agreed?
          </label>
          <Field name="cb1" component={Checkbox} form={props.form} />
          <Cbox name="cb2" label="is CB2?" form={props.form} />
          <Rbox name="rb2" label="Red" rvalue="R" form={props.form} />
          <Rbox name="rb2" label="Green" rvalue="G" form={props.form} />
          <Rbox name="rb2" label="Blue" rvalue="B" form={props.form} />
        </li>
        <li className="example-form_item">
          <label htmlFor="f3" className="example-form_field-label">
            Third Field
          </label>
          {props.status==='a'? <Field name="field3" form={props.form} validate={[maxLength5, required]} placeholder="place it" component={Input}/>: 'ggg'}
        </li>
        <li className="example-form_item">
          <FormStatus form={props.form}>
            {({isValid, errorCount}) => {
              return(
                <button onClick={props.form.submit} className="example-form_button" disabled={false}>
                  Send {isValid? 'Ok': 'Not OK'} {errorCount + '.'}
                </button>
              )
            }}
          </FormStatus>
        </li>
       </ul>
      </fieldset>
    <div>
      <label>Last Name</label>
      <Field
        form={props.form}
        name="lastName"
        component={Input}
        type="text"
        validate={required}
        placeholder="Last Name"
      />
    </div>
    <div>
      <label>Hob</label>
      <Field
        form={props.form}
        name="hob"
        component={Input}
        type="text"
        validate={required}
        placeholder="eg. Stamp Collecting"
      />
    </div>
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


