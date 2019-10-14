import React, {Fragment, useState} from 'react';
import Dialog, {alert, confirm, modal} from './dialog';


const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const openModal = () => {
    const close = modal(<div>你好 <button onClick={()=>close()}>close</button></div>)
  }
  return (
    <Fragment>
      <div style={{position: 'relative', zIndex: 10, border: '1px solid red', color: 'red'}}>
        <h1>示例一 </h1>
        <button onClick={() => {setX(!x);}}>click</button>
        <Dialog visible={x} buttons={
          [
            <button onClick={() => {setX(false);}}>ok</button>,
            <button onClick={() => {setX(false);}}>cancel</button>
          ]}
                onClose={() => {setX(false);}}
        >
          <div>hi</div>
        </Dialog>
      </div>
      <div style={{position: 'relative', zIndex: 9}}>
        <h1>示例二</h1>
        <button onClick={() => {setY(!y);}}>click</button>
        <Dialog visible={y} closeOnClickMask={true} buttons={
          [
            <button onClick={() => {setY(false);}}>ok</button>,
            <button onClick={() => {setY(false);}}>cancel</button>
          ]}
                onClose={() => {setY(false);}}
        >
          <div>hi</div>
        </Dialog>
      </div>
      <div>
        <h1>示例三</h1>
        <button onClick={() => alert('1')}>alert</button>
      </div>
      <div>
        <h1>示例四</h1>
        <button onClick={() => confirm('1', () => {console.log('你点击了yes');}, () => {console.log('你点击了no')})}>
          confirm
        </button>
        <button onClick={openModal}>modal</button>
      </div>
    </Fragment>

  );
};

export default DialogExample;