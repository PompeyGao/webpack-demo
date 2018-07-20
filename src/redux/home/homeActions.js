/**action */
export const LOAD_ARTICLES = 'home/LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS = 'home/LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_ERROR = 'home/LOAD_ARTICLES_ERROR';

function getArticleListRequest() {
    return {
        type: LOAD_ARTICLES
    };
}

function getArticleListSuccess(articleList) {
    return {
        type: LOAD_ARTICLES_SUCCESS,
        articleList: articleList
    };
}

function getArticleListFail() {
    return {
        type: LOAD_ARTICLES_ERROR
    };
}

export function getArticleList() {
    return function(dispatch) {
        dispatch(getArticleListRequest());
         new Promise((resolve, reject) => {
            return fetch(`/api/articles.json`)
                .then(response => response.json())
                .then(resData => {
                    dispatch(getArticleListSuccess(resData));
                    return resolve(resData);
                })
                .catch(err => {
                    dispatch(getArticleListFail());
                    reject(err);
                });
        });
    };
}
