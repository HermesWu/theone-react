import * as React from 'react';
import {ReactElement} from 'react';
import './dialog.scss'
import {scopedClassMaker} from '../helps/classes';
import {Icon} from '../index';

interface Props {
  visible: boolean,
  buttons?: Array<ReactElement>
}

const scopedClass = scopedClassMaker('theone-dialog')
const sc = scopedClass

const Dialog: React.FunctionComponent<Props> = (props) => {
  return (
    props.visible ?
      <div>
        <div className={sc('mask')}/>
        <div className={sc('')}>
          <div className={sc("close")}>
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
      </div> :
      null
  );
};

export default Dialog;