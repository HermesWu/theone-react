import React, {ReactFragment} from 'react';

interface FormValue{
  [k:string]: any
}

interface Props {
  value: FormValue
  fields: Array<{ name: string, label: string, input: { type: string } }>
  buttons: ReactFragment
  onSubmit: React.FormEventHandler
  onChange: FormValue
}

const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value;
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

  };
  return (
    <form onSubmit={onSubmit}>
      {props.fields.map(f =>
        <div key={f.name}>
          {f.label}
          <input
            type={f.input.type}
            value={formData[f.name]}
            onChange={onInputChange}
          />
        </div>
      )}
      <div>
        {props.buttons}
      </div>
    </form>
  );
};
export default Form;