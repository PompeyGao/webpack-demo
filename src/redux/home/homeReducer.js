import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_ERROR
} from './homeActions';

const initState = {
    loading: true,
    articleList: [],
    error: false
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                loading: true,
                articleList: [],
                error: false
            };
        case LOAD_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                articleList: action.articleList,
                error: false
            };
        case LOAD_ARTICLES_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}
