import * as React from 'react';
import {HTMLAttributes, UIEventHandler, useState, useEffect, useRef} from 'react';
import {scopedClassMaker} from '../helps/classes';
import scrollbarWidth from './scroll-width';
import './scroll.scss';


interface Props extends HTMLAttributes<HTMLDivElement> {}

const scopedClass = scopedClassMaker('theone-scroll');
const sc = scopedClass;

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;

  const [barHeight, setBarHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const onScroll: UIEventHandler = (e) => {
    const {current} = containerRef
    const scrollTop = current!.scrollTop
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    setScrollTop(scrollTop * viewHeight / scrollHeight)

  };
  useEffect(() => { // mounted 的时候计算滚动条高度
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, []);
  return (
    <div className={sc('')} {...rest}>
      <div
        className={sc('inner')}
        style={{right: -scrollbarWidth()}}
        ref={containerRef}
        onScroll={onScroll}
      >
        {children}
      </div>
      <div className={sc('track')}>
        <div className={sc('bar')} style={{height: barHeight, transform:`translateY(${scrollTop}px)`}}></div>
      </div>
    </div>
  );
};

export default Scroll;


