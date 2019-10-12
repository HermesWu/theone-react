import React from 'react';
import {scopedClassMaker} from '../helps/classes';

interface Props extends React.HTMLAttributes<HTMLElement>{

}

const sc = scopedClassMaker('theone-layout')

const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props
  return (
    <div className={sc('', {extra: className})} {...restProps}>
      {props.children}
    </div>
  );
};

export default Layout;