import * as React from 'react';
import './icons/wechat.svg';
import './icons/alipay.svg'
import './icons/qq.svg'


interface IconProps {
    name: string
}

const icon: React.FunctionComponent<IconProps> = (props) => {
    return (
        <span>
            <svg>
                <use xlinkHref={`#${props.name}`}/>
            </svg>
        </span>
    );
};

export default icon;