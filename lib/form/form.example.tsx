import Form from './form';
import React, { useState, Fragment } from 'react';

const FormExample: React.FunctionComponent = () => {
  const [formData] = useState({
    username: 'test',
    password: ''
  })
  const [fields] = useState([
    {name:'username', label:'用户名', input:{type: 'text'}},
    {name: 'password', label: '密码', input:{type: 'password'}}
  ])
  const onSubmit: React.FormEventHandler<HTMLInputElement> = (e) =>{
    console.log(e)
  }
  return (
    <Form
      value={formData}
      fields={fields}
      onSubmit={onSubmit}
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