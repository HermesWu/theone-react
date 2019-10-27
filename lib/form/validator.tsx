import {FormValue} from './form';

interface FormRule {
  key: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string) => Promise<string>
}

interface OneError {
  message: string,
  promise?: Promise<any>
}


type FormRules = Array<FormRule>

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

const validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void) => {
  const errors: any = {};
  const addErrors = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = [];
    }
    errors[key].push(error);
  };
  rules.map(rule => {
    const value = formValue[rule.key];
    if (rule.validator) {
      const promise = rule.validator(value)
      addErrors(rule.key, {message: rule.validator.name, promise: promise});
    }
    if (rule.required && isEmpty(value)) {
      addErrors(rule.key, {message: 'required'});
    }
    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addErrors(rule.key, {message: 'minLength'});
    }
    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addErrors(rule.key, {message: 'maxLength'});
    }
    if (rule.pattern && !isEmpty(value) && !rule.pattern.test(value)) {
      addErrors(rule.key, {message: 'pattern'});
    }
  });
  const promiseList = flat<OneError|OneError[]>(Object.values(errors)).filter(item => item.promise).map(item => item.promise);
  Promise.all(promiseList)
    .finally(() => {
      // 对errors 进行处理，剔除promise，重新组合成正确格式
      // console.log(errors)
      const newErrors = fromEntries(
        Object.keys(errors)
          .map<[string, string[]]>(key => [key, errors[key].map((item: OneError) => item.message)]));
      callback(newErrors);
    });
};

export default validator;

function flat<T>(array: Array<T | T[]>) {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      result.push(...array[i] as T[]);
    } else {
      result.push(array[i] as T);
    }
  }
  return result;
}

function zip(kvList: Array<[string, string]>) {
  const result: { [key: string]: string[] } = {};
  kvList.map(([key, value]) => {
    result[key] = result[key] || [];
    result[key].push(value);
  });
  return result;
}

function fromEntries(array:Array<[string, string[]]>){
  const result:{[key:string]: string[]} = {}
  for(let i = 0; i < array.length; i++){
    result[array[i][0]] = array[i][1]
  }
  return result
}