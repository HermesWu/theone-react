import React, {Fragment, ReactElement} from 'react';
import './dialog.scss';
import {scopedClassMaker} from '../helps/classes';
import {Icon} from '../index';
import ReactDOM from 'react-dom';

interface Props {
  visible: boolean,
  buttons?: Array<ReactElement>,
  onClose: React.MouseEventHandler,
  closeOnClickMask?: boolean
}

const scopedClass = scopedClassMaker('theone-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<Props> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };
  const result = props.visible &&
    <Fragment>
      <div className={sc('mask')} onClick={onClickMask}/>
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
          {props.buttons && props.buttons.map((button, index) =>
            React.cloneElement(button, {key: index})
          )}
        </footer>
      </div>
    </Fragment>
  return (
    ReactDOM.createPortal(result, document.body)
  );
};
Dialog.defaultProps = {
  closeOnClickMask: false
};

const alert = (content:string) => {
  const component = <Dialog onClose={() => {
    ReactDOM.render(React.cloneElement(component, {visible: false}), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }} visible={true}>{content}</Dialog>
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(component, div)
}

export default Dialog;
export {alert}