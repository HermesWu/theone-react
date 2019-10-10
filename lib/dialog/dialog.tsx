import React, {Fragment, ReactElement} from 'react';
import './dialog.scss';
import {scopedClassMaker} from '../helps/classes';
import {Icon} from '../index';

interface Props {
  visible: boolean,
  buttons?: Array<ReactElement>,
  onClose: React.MouseEventHandler
}

const scopedClass = scopedClassMaker('theone-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<Props> = (props) => {
  const onClickClose:React.MouseEventHandler = (e) => {
    props.onClose(e)
  }
  return (
    props.visible ?
      <Fragment>
        <div className={sc('mask')}/>
        <div className={sc('')}>
          <div className={sc('close')} onClick={onClickClose}>
            <Icon name="close"></Icon>
          </div>
          <header className={sc('header')}>
            提示
          </header>
          <main className={sc('main')}>
            <div>{props.children}</div>
          </main>
          <footer className={sc('footer')}>
            {props.buttons}
          </footer>
        </div>
      </Fragment> :
      null
  );
};

export default Dialog;