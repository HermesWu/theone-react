import React, {ReactElement} from 'react';
import {scopedClassMaker} from '../helps/classes';
import './layout.scss';
import Aside from './aside';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}

const sc = scopedClassMaker('theone-layout');

const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props;

  const children = props.children as Array<ReactElement>;
  const hasAside = children.length &&
    children.reduce((result, node) => result || node.type === Aside, false);

  return (
    <div className={sc('', {extra: [className, hasAside && 'hasAside'].join(' ')})} {...restProps}>
      {props.children}
    </div>
  );
};

export default Layout;