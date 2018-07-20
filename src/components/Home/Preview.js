import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Preview extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number,
        date: PropTypes.string,
        handleNavigate: PropTypes.func
    };

    render() {
        // console.log(this.props, 11);
        const { title, id, description, date, handleNavigate } = this.props;
        return (
            <article>
                <h2>
                    <a href={`/detail/`} onClick={handleNavigate.bind(this, id)}>
                        {title}
                    </a>
                </h2>
                <span>{date}</span>
                <p>{description}</p>
            </article>
        );
    }
}
