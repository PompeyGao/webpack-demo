import React, { Component } from 'react';
import { Table, Input } from 'antd';

const Search = Input.Search;

const columns = [
    {
        title: '标题',
        dataIndex: 'title'
    },
    {
        title: '描述',
        dataIndex: 'description'
    },
    {
        title: '发布日期',
        dataIndex: 'date'
    }
];

const ArticleTable = props => {
    return (
        <div>
            <Search
                style={{width: "30%", margin: '20px 0px'}}
                placeholder="关键字"
                enterButton
                onSearch={props.changeQuery}
            />
            <Table
                bordered
                rowKey="id"
                columns={columns}
                dataSource={props.articleList}
            />
        </div>
    );
};
export default ArticleTable;

/* export default class ArticleTable extends Component {
    render() {
        return <Table columns={columns} dataSource={this.props.articleList} />;
    }
} */
