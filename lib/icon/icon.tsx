import * as React from 'react';
import './importIcons';
import './icon.scss';
import classes from '../helps/classes';


interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string
}

const icon: React.FunctionComponent<IconProps> =
    ({className, name, ...restProps}) => {
    return (
        <svg className={classes('theonen-icon', className)} {...restProps}>
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
};

export default icon;