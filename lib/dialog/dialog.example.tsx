import React, {Fragment, useState} from 'react';
import Dialog from './dialog';


const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  return (
    <Fragment>
      <div style={{position: 'relative', zIndex: 10, border: '1px solid red', color:'red'}}>
        <h1>Example 1</h1>
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
      <div style={{position: 'relative', zIndex:9}}>
        <h1>Example 2</h1>
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
    </Fragment>

  );
};

export default DialogExample;