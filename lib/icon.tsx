import * as React from 'react';
import wechat from './Icons/we_chat.svg';

console.log(wechat)

interface IconProps {
    name: string
}

const icon: React.FunctionComponent<IconProps> = (props) => {
    return (
        <div>
            icon
        </div>
    );
};

export default icon;