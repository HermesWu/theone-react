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

const validator = (formValue: FormValue, rules: FormRules): FormErrors => {
  return {};
};

export default validator;