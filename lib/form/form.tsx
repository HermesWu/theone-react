import React, {ReactFragment} from 'react';
import Input from '../Input/input';
import {scopedClassMaker} from '../helps/classes';
import './form.scss';

export interface FormValue {
  [k: string]: any
}

interface Props {
  value: FormValue
  fields: Array<{ name: string, label: string, input: { type: string } }>
  buttons: ReactFragment
  onSubmit: React.FormEventHandler
  onChange: (value: FormValue) => void
  errors: { [k: string]: string[] },
  errorsDisplayMode?: 'first' | 'all'
}

const sc = scopedClassMaker('theone-form');

const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value;
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = {...formData, [name]: e.target.value};
    props.onChange(newValue);
  };
  return (
    <form onSubmit={onSubmit}>
      <table className={sc('table')}>
        <tbody>
        {props.fields.map(f =>
          <tr key={f.name} className={sc('tr')}>
            <td className={sc('td')}>
              <span className={sc('label')}>{f.label}</span>
            </td>
            <td className={sc('td')}>
              <Input
                type={f.input.type}
                value={formData[f.name]}
                onChange={onInputChange.bind(null, f.name)}
              />
              <div className={sc('error')}>{
                props.errors[f.name] ?
                  (props.errorsDisplayMode === 'first'?
                      props.errors[f.name][0]:
                      props.errors[f.name].join('')
                  ):
                  <span style={{userSelect:'none'}}>&nbsp;</span>
              }</div>
            </td>
          </tr>
        )}
        <tr className={sc('tr')}>
          <td className={sc('td')}/>
          <td className={sc('td')}>
            <div>
              {props.buttons}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  );
};
Form.defaultProps = {
  errorsDisplayMode: 'first'
}
export default Form;