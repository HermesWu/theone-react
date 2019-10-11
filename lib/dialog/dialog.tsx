import React, {Fragment, ReactElement, ReactNode} from 'react';
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
    </Fragment>;
  return (
    ReactDOM.createPortal(result, document.body)
  );
};
Dialog.defaultProps = {
  closeOnClickMask: false
};
const modal = (content: ReactNode, buttons?:Array<ReactElement>, afterClose?:()=>void) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, {visible: false}), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }
  const component = (
    <Dialog
      onClose={()=>{
        onClose()
        afterClose && afterClose()
      }}
      visible={true}
      buttons={buttons}>
      {content}
    </Dialog>
  )
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(component, div);
  return onClose
}
const alert = (content: string) => {
   const close = modal(content,[<button onClick={() => close()}>ok</button>])
};

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onOk = () => {
    close();
    yes && yes();
  };
  const onNo = () => {
    close();
    no && no();
  };
  const close = modal(content, [<button onClick={onOk}>ok</button>, <button onClick={onNo}>cancel</button>], no)

};



export default Dialog;
export {alert, confirm, modal};