import React, { Component } from 'react';

const Tick = ({ size = 12, fill = '#666', x = 0, y = 0 } = props) => { 
    return ( 
        <svg x={x} y={y} width={size} height={size} viewBox="0 0 1024 1024" fill={fill}> 
            <path d="M980.96 299.904l-528.864 528.864c-24.384 24.384-61.536 28.192-89.952 
            11.392-5.216-3.104-10.208-6.912-14.72-11.392 0-0.032 0-0.032 0-0.032l-304.448-304.416c-28.896-28.896-28.896-75.808 0-104.704s75.744-28.896 
            104.672 0l252.192 252.192 476.48-476.576c28.896-28.896 75.744-28.896 104.64 0 28.928 28.896 28.928 75.808 0 104.672l0 0z" /> 
        </svg> 
    ); 
}; 
export default Tick;