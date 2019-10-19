import Form, {FormValue} from './form';
import React, { useState, Fragment } from 'react';
import validator from './validator';

const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'test',
    password: ''
  })
  const [fields] = useState([
    {name:'username', label:'用户名', input:{type: 'text'}},
    {name: 'password', label: '密码', input:{type: 'password'}}
  ])
  const onSubmit: React.FormEventHandler<HTMLInputElement> = (e) =>{
    const rules = [
      {key: 'username', required: true}
    ]
    const errors = validator(formData, rules)
    console.log('errors',errors);
  }
  return (
    <Form
      value={formData}
      fields={fields}
      onSubmit={onSubmit}
      onChange={(newValue) => setFormData(newValue)}
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