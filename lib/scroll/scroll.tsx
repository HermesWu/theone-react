import * as React from 'react';
import {HTMLAttributes, UIEventHandler, useState, useEffect, useRef, MouseEventHandler} from 'react';
import {scopedClassMaker} from '../helps/classes';
import scrollbarWidth from './scroll-width';
import './scroll.scss';


interface Props extends HTMLAttributes<HTMLDivElement> {}

const scopedClass = scopedClassMaker('theone-scroll');
const sc = scopedClass;

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;

  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);
  const setBarTop = (number:number) => {
    const {current} = containerRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight
    if(number < 0 || number > maxBarTop) {return}
    _setBarTop(number)

  }
  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll: UIEventHandler = (e) => {
    const {current} = containerRef;
    const scrollTop = current!.scrollTop;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    setBarTop(scrollTop * viewHeight / scrollHeight);

  };
  useEffect(() => { // mounted 的时候计算滚动条高度
    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarHeight(viewHeight * viewHeight / scrollHeight);
  }, []);

  const draggerRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopRef = useRef(0);
  const onMouseDownBar: MouseEventHandler = (e) => {
    draggerRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop;
  };
  const onMouseUpBar = () => {
    draggerRef.current = false;
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggerRef.current) {
      const delta = e.clientY - firstYRef.current;
      const newBarTop = delta + firstBarTopRef.current;
      setBarTop(newBarTop);
    }
  };
  useEffect(() => {
    document.addEventListener('mouseup', onMouseUpBar)
    document.addEventListener('mousemove', onMouseMoveBar)
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar)
      document.removeEventListener('mousemove', onMouseMoveBar)
    }
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
        <div className={sc('bar')} style={{height: barHeight, transform: `translateY(${barTop}px)`}}
             onMouseDown={onMouseDownBar}
        ></div>
      </div>
    </div>
  );
};

export default Scroll;


