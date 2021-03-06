import React from 'react'
import {useMeter} from '@react-aria/meter'

function Meter(props) {
    let {
      label,
      showValueLabel = !!label,
      value,
      minValue = 0,
      maxValue = 100
    } = props;

    let {meterProps, labelProps} = useMeter(props);
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;
  
    return (
      <div {...meterProps} style={{width: '125px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {label && 
            <span {...labelProps}>
                {label}
            </span>
          }

            {showValueLabel && 
            <span>
                {meterProps['aria-valuetext']}
            </span>}
        </div>

        <div style={{height: 10, background: 'gray'}}>
          <div style={{width: barWidth, height: 10, background: value>70 ? 'green' : value > 40 ? 'yellow' : value > 15 ? 'orange' : 'red' }} />
        </div>
      </div>
    );
}

export default Meter