import * as React  from 'react';
import { HTMLAttributes } from 'react';
import './scroll.scss'
import {scopedClassMaker} from '../helps/classes';
import scrollbarWidth from './scroll-width';

interface Props extends HTMLAttributes<HTMLDivElement>{}
const scopedClass = scopedClassMaker('theone-scroll')
const sc = scopedClass

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props
  return(
    <div className={sc('')} {...rest}>
      <div className={sc('inner')} style={{right: -scrollbarWidth()}}>
        {children}
      </div>
    </div>
  )
}

export default Scroll


