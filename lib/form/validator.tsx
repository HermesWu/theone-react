import {FormValue} from './form';

interface FormRule {
  key: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string) => Promise<string>
}


type FormRules = Array<FormRule>

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

const validator = (formValue: FormValue, rules: FormRules, callback:(errors: any) => void) => {
  const errors: any = {};
  const addErrors = (key: string, message: string|Promise<any>) => {
    if (errors[key] === undefined) {
      errors[key] = [];
    }
    errors[key].push(message);
  };
  rules.map(rule => {
    const value = formValue[rule.key];
    if(rule.validator){
      const promise = rule.validator(value)
      addErrors(rule.key, promise)
    }
    if (rule.required && isEmpty(value)) {
      addErrors(rule.key, '必填');
    }
    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addErrors(rule.key, '太短');
    }
    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addErrors(rule.key, '太长');
    }
    if(rule.pattern && !isEmpty(value) && !rule.pattern.test(value)){
      addErrors(rule.key, '格式不正确')
    }
  });
  console.log('errors',errors)
  Promise.all(flat(Object.values(errors)))
    .finally(()=>{callback(errors)})
};

export default validator;
function flat(array:Array<any>){
  const result = []
  for(let i = 0; i < array.length; i++){
    if(array[i] instanceof Array){
      result.push(...array[i])
    }else{
      result.push(array[i])
    }
  }
  return result
}