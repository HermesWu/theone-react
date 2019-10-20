import React, { ButtonHTMLAttributes } from 'react';
import {scopedClassMaker} from '../helps/classes';
import './button.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  level?: 'important' | 'danger' | 'normal'
}

const sc = scopedClassMaker('theone-button')

const Button:React.FunctionComponent<Props> = (props) => {
  const {className, level, children, ...restProps} = props
  return (
    <button
      className={sc('',{extra:`theone-button-${level}`})}
      {...restProps}
    >{children}</button>
  )
}
Button.defaultProps = {
  level: 'normal'
}
export default Button;