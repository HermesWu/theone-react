/*
* TODO:
* 1. 支持子字段编辑
* 2. 支持更多的type / 自定义 input
* 3. 支持手机端
* */

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
  errors: { [k: string]: string[] }
  errorsDisplayMode?: 'first' | 'all'
  transformError?: (message:string) => string
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
  const transformError = (message:string)=>{
    const map:any = {
      required: '必填',
      minLength: '长度过短',
      maxLength: '长度过长',
      pattern: '格式不正确'
    }
    return props.transformError&&props.transformError(message) || map[message] || '未知错误'
  }
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
                      transformError(props.errors[f.name][0]):
                      transformError(props.errors[f.name].join(''))
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