// import * as React from 'react'
import * as React from 'react';
import * as ReactDom from 'react-dom';
import Icon from './icon'

const fn:React.MouseEventHandler = (e) => {
        console.log(e.target)
}

ReactDom.render(<div>
        <Icon name="wechat"  onClick={fn}/>
        <Icon name="alipay" onMouseEnter={(e)=>{console.log('enter');console.log(e.target)}}/>
        <Icon name="qq" />
</div>
    , document.querySelector('#root')
);