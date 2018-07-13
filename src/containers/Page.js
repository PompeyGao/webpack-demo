import React, { PureComponent } from 'react';
import './style.css';
import image1 from './images/qgwl.gif';
import image2 from './images/photo.jpg';
import Button from 'components/Button';

export default class Page extends PureComponent {
    state = {
        show: false
    };
    
    render() {
        const { show } = this.state;
        const display = show ? 'block' : 'none';
        return (
            <div className="font-box">
                <img src={image1} />
                <img style={{ display: `${display}` }} src={image2} />
                <br />
                <Button onClick={() => this.setState({ show: !show })}>
                    {show ? '- 1' : '+ 1'}
                </Button>
            </div>
        );
    }
}
