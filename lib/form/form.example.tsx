import Form, {FormValue} from './form';
import React, {useState, Fragment} from 'react';
import Validator from './validator';
import Button from '../button/button';

const usernames = ['daniel', 'jack', 'bob', 'tom', 'alice', 'frank'];
const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
  setTimeout(() => {
    console.log('我知道名字是否已经存在');
    if (usernames.indexOf(username) >= 0) {
      fail()
    } else {
      succeed();;
    }
  }, 2000);
};

const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'daniel',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [fields] = useState([
    {name: 'username', label: '用户名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}}
  ]);
  const validator = (username: string) => {
    return new Promise<string>((resolve, reject) => {
      checkUserName(username, resolve, () => reject('unique'));
    });
  };
  const onSubmit: React.FormEventHandler<HTMLInputElement> = (e) => {
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 6},
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'username', validator},
      {key: 'password', required: true},
      {key: 'password', pattern: /^[A-Za-z0-9]+$/},
    ];
    Validator(formData, rules, (errors)=>{
      if (noError(errors)) {
        // TODO somethings
      } else {
        // Errors
        setErrors(errors);
        console.log('errors', errors);
      }
    });


  };
  const transformError = (message: string) => {
    const map:any={
      unique: 'username is taken',
      required: 'required'
    }
    return map[message]
  }
  return (
    <Form
      value={formData}
      fields={fields}
      onSubmit={onSubmit}
      onChange={(newValue) => setFormData(newValue)}
      errors={errors}
      transformError={transformError}
      buttons={
        <Fragment>
          <Button level='important' type={'submit'}>提交</Button>
          <Button>返回</Button>
        </Fragment>
      }
    />
  );
};
export default FormExample;

export function noError(errors: any) {
  return Object.keys(errors).length === 0;
}