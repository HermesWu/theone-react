import Form, {FormValue} from './form';
import React, { useState, Fragment } from 'react';
import validator from './validator';

export function noError(errors: any) {
  return Object.keys(errors).length === 0;
}

const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'test',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [fields] = useState([
    {name:'username', label:'用户名', input:{type: 'text'}},
    {name: 'password', label: '密码', input:{type: 'password'}}
  ])
  const onSubmit: React.FormEventHandler<HTMLInputElement> = (e) =>{
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 6, maxLength: 12},
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true},
      {key: 'password', pattern: /^[A-Za-z0-9]+$/},
    ]
    const errors = validator(formData, rules)
    setErrors(errors)
    if(noError(errors)){
      // TODO somethings
    }else{
      // Errors
      console.log('errors',errors);
    }
  }
  return (
    <Form
      value={formData}
      fields={fields}
      onSubmit={onSubmit}
      onChange={(newValue) => setFormData(newValue)}
      errors={errors}
      buttons={
      <Fragment>
        <button type={'submit'}>提交</button>
        <button >返回</button>
      </Fragment>
      }
    />
  );
};
export default FormExample;