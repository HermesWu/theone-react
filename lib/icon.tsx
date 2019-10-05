import * as React from 'react';
import './importIcons';
import './icon.scss'


interface IconProps {
    name: string
}

const icon: React.FunctionComponent<IconProps> = (props) => {
    return (
        <svg className="theonen-icon">
            <use xlinkHref={`#${props.name}`}/>
        </svg>
    );
};

export default icon;