import React, {ReactElement} from 'react';
import {scopedClassMaker} from '../helps/classes';
import './layout.scss'
import Aside from './aside';

interface Props extends React.HTMLAttributes<HTMLElement>{
  children: ReactElement | Array<ReactElement>
}
const sc = scopedClassMaker('theone-layout')

const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props

  let hasAside = false

  console.log(props.children);
  (props.children as Array<ReactElement>).map(node => {
    if(node.type === Aside){
      hasAside = true
    }
  })

  return (
    <div className={sc('', {extra: [className, hasAside && 'hasAside'].join(' ')})} {...restProps}>
      {props.children}
    </div>
  );
};

export default Layout;