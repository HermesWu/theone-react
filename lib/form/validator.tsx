import {FormValue} from './form';

interface FormRule {
  key: string
  required?: boolean
  minLength?: number
  maxLength?: number
}

interface FormErrors {
  [T: string]: string[]
}

type FormRules = Array<FormRule>

function isEmpty(value: any){
  return value === undefined || value === null || value === ''
}

const validator = (formValue: FormValue, rules: FormRules): FormErrors => {
  const errors:any = {}
  const addErrors = (key:string, message:string) => {
    if(errors[key] === undefined){
      errors[key] = []
    }
    errors[key].push(message)
  }
  rules.map(rule => {
    const value = formValue[rule.key]
    if(rule.required && isEmpty(value)){
      addErrors(rule.key, '必填')
    }
  });
  return errors;
};

export default validator;