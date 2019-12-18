import {FormValue} from './form';

interface FormRule {
  key: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string) => Promise<string>
}

type OneError = string | Promise<string>


type FormRules = Array<FormRule>

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

const validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void) => {
  const errors: {[key:string]: OneError[]} = {};
  const addErrors = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = [];
    }
    errors[key].push(error);
  };
  rules.map(rule => {
    const value = formValue[rule.key];
    if (rule.validator) {
      const promise = rule.validator(value);
      addErrors(rule.key, promise);
    }
    if (rule.required && isEmpty(value)) {
      addErrors(rule.key, 'required');
    }
    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addErrors(rule.key, 'minLength');
    }
    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addErrors(rule.key, 'maxLength');
    }
    if (rule.pattern && !isEmpty(value) && !rule.pattern.test(value)) {
      addErrors(rule.key, 'pattern');
    }
  });
  // [ [[u,p1],[u,p2]],[[p,p1],[p,p2]] ]
  // errors[key] = [p1,p2]

  const flattenErrors = flat<[string, Promise<string>]>(Object.keys(errors)
    .map(key => errors[key]
      .map((promise: Promise<string>) => [key, typeof promise === 'string' ? Promise.reject(promise) : promise])
    ));
  // Promise<['u', p1]>
  // 这个promise 检查用户名，我们需要让这个promise 永远不报错, throw new Error('error')
  const newPromiseList = flattenErrors.map(([key, errors]) => errors.then<[string,undefined],[string,string]>(() =>
      [key, undefined]
    , (reason) =>
      [key, reason]
    )
  );
  // 解决any 时，filter 接受泛型 类型守卫
  function hasError(item: [string, undefined] | [string, string]): item is [string, string]{
    return typeof item[1] === 'object'
  }
  Promise.all(newPromiseList).then(result => {
    callback(zip(result.filter<[string, string]>(hasError)));
  });

  // const promiseList = flat<OneError>(Object.values(errors)).filter(item => item.promise).map<OneError|OneError[]>(item => item.promise);
  // Promise.all(promiseList)
  //   .finally(() => {
  //     // 对errors 进行处理，剔除promise，重新组合成正确格式
  //     // console.log(errors)
  //     const newErrors = fromEntries(
  //       Object.keys(errors)
  //         .map<[string, string[]]>(key => [key, errors[key].map((item: OneError) => item.message)]));
  //     callback(newErrors);
  //   });
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

//
// function fromEntries(array: Array<[string, string[]]>) {
//   const result: { [key: string]: string[] } = {};
//   for (let i = 0; i < array.length; i++) {
//     result[array[i][0]] = array[i][1];
//   }
//   return result;
// }