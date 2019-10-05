// import * as React from 'react'
import * as React from 'react';
import * as ReactDom from 'react-dom';
import Icon from './icon'

ReactDom.render(<div>
        <Icon name="wechat" />
        <Icon name="alipay" />
        <Icon name="qq" />
</div>
    , document.querySelector('#root')
);