import React from 'react';
import Demo from '../../demo';
import IconExample from './icon.example';

const IconDemo = () => {
  return(
    <div>
      <Demo code={require('!!raw-loader!./icon.example.tsx').default}>
        <IconExample/>
      </Demo>
    </div>

  )
}

export default IconDemo