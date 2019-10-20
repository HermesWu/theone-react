import React, { InputHTMLAttributes } from 'react';
import {scopedClassMaker} from '../helps/classes';
import './input.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const sc = scopedClassMaker('theone-input')

const Input: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props
  return (
    <input
      type="text"
      {...restProps}
      className={sc('',{extra: className})}
/>
)
}
export default Input;