import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Star from 'components/Graphic/StarSvg';
import Tick from 'components/Graphic/TickSvg';

export default class Graphic extends Component {
    static propTypes = {
        rotation: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = { rotation: 0, color: 'green' };
    componentDidMount() {
        const context = findDOMNode(this.refs.canvas).getContext('2d');
        this.paint(context);
    }
    componentDidUpdate() {
        const context = findDOMNode(this.refs.canvas).getContext('2d');
        context.clearRect(0, 0, 200, 200);
        this.paint(context);
    }
    paint(context) {
        context.save();
        context.translate(100, 100);
        context.rotate(this.props.rotation, 100, 100);
        context.fillStyle = this.props.color;
        context.fillRect(-50, -50, 100, 100);
        context.restore();
    }

    render() {
        const st = { size: 50, fill: '#000' };
        return (
            <div>
                <canvas ref="canvas" width={200} height={200} />
                <svg width={500} height={200} viewBox="0 0 1000 400">
                    <circle
                        cx={100}
                        cy={200}
                        r={80}
                        fill="#1e74e7"
                        fillOpacity={0.4}
                        stroke="#1e74e7"
                        strokeWidth={4}
                    />
                    <rect
                        x={265}
                        y={90}
                        width={150}
                        height={200}
                        fill="#99cc33"
                        stroke="#99cc33"
                        fillOpacity={0.4}
                        strokeWidth={4}
                    />
                    <path
                        d="M500,200L550,200L600,50L700,350L800,50L900,350L950,200h50"
                        stroke="#ffab18"
                        fill="none"
                        strokeWidth={4}
                    />
                </svg>
                <Star {...st} />
                <Tick {...st} />
                <svg width={40} height={40}>
                    <Star size={30} fill="#96c7fa" />
                    <Tick size={15} x={8} y={10} fill="#1e74e7" />
                </svg>
            </div>
        );
    }
}
