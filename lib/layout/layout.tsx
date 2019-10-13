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
  const hasAside = children.length > 0 &&
    children.reduce((result, node) => result || node.type === Aside, false);

  return (
    <div className={sc({'': true, hasAside}, {extra: className})} {...restProps}>
      {props.children}
    </div>
  );
};

export default Layout;
export {Layout}
export { default as Header} from './header'
export { default as Content} from './content'
export { default as Aside} from './aside'
export { default as Footer} from './footer'