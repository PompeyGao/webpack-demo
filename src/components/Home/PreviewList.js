import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Preview from './Preview';

export default class PreviewList extends PureComponent {
    static propTypes = {
        articleList: PropTypes.arrayOf(PropTypes.object),
        loading: PropTypes.bool,
        error: PropTypes.bool,
        getArticleList: PropTypes.func
    };

    componentDidMount() {
        this.props.getArticleList();
    }

    handleNavigate(id, e) {
        // 阻止原生链接跳转
        e.preventDefault();

        this.props.history.push(`/detail/${id}`);
    }

    render() {
        const { loading, error, articleList } = this.props;
        // console.log('PreviewList-----', this.props);
        if (error) {
            return <p>数据获取失败！</p>;
        }
        if (loading) {
            return <p> Loading... </p>;
        }
        return articleList.map(item => (
            <Preview
                {...item}
                key={item.id}
                handleNavigate={this.handleNavigate.bind(this)}
            />
        ));
    }
}
