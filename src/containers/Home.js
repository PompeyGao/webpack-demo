import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ArticleTable, PreviewList } from 'components/Home';
import * as listActions from '../redux/home/homeActions';
// import { DatePicker } from 'antd';
import './Home.css';
// import image1 from './images/qgwl.gif';
// import image2 from './images/photo.jpg';
// import { dispatch } from 'rxjs/internal/observable/range';

@connect(
    state => {
        const { home: list = {} } = state;
        return { list };
    },
    dispatch => ({
        actions: bindActionCreators({ ...listActions }, dispatch)
    })
)
export default class Home extends PureComponent {
    changeQuery = value => {
        console.log(value);
    };

    render() {
        // const { show } = this.state;
        // const display = show ? 'block' : 'none';
        // console.log('Home====', this.props);
        return (
            <div style={{ margin: 20 }}>
                <h1>Home</h1>
                <PreviewList
                    {...this.props.list}
                    {...this.props.actions}
                    history={this.props.history}
                />
                <ArticleTable
                    {...this.props.list}
                    changeQuery={this.changeQuery}
                />
                {/* <img src={image1} />
                <img style={{ display: `${display}` }} src={image2} />
                <br />
                <Button onClick={() => this.setState({ show: !show })}>
                    {show ? '- 1' : '+ 1'}
                </Button> */}
            </div>
        );
    }
}
