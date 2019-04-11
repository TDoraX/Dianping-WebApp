import {get} from '../../utils/request';
import url from '../../utils/url';
import {FETCH_DATA} from "../middleware/api";
import {schema} from './entities/products';

// 请求参数使用到的常量对象
export const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNTS: 'discounts',
    PAGE_SIZE_LIKES: 5,
    PAGE_SIZE_DISCOUNTS: 3
};

export const types = {
    FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST', // 获取“猜你喜欢”请求
    FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS', // 获取“猜你喜欢”请求成功
    FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE', // 获取“猜你喜欢”请求失败
    FETCH_DISCOUNT_REQUEST: 'HOME/FETCH_DISCOUNT_REQUEST', // 获取“特惠信息”请求
    FETCH_DISCOUNT_SUCCESS: 'HOME/FETCH_DISCOUNT_SUCCESS', // 获取“特惠信息”请求成功
    FETCH_DISCOUNT_FAILURE: 'HOME/FETCH_DISCOUNT_FAILURE', // 获取“特惠信息”请求失败
};

const initialState = {
    likes: {
        isFetching: false,
        pageCount: 0,
        ids: []
    },
    discounts: {
        isFetching: false,
        ids: []
    }
};

export const actions = {
    // 加载“猜你喜欢”的数据
    loadLikes: () => {
        return (dispatch, getState) => {
            const {pageCount} = getState().home.likes;
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
            const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES);
            return dispatch(fetchLikes(endpoint));
        }
    },

    // 加载“特惠信息”的数据
    loadDiscounts: () => {
        return (dispatch, getState) => {
            const endpoint = url.getProductList(params.PAGE_SIZE_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
            return dispatch(fetchDiscounts(endpoint));
        }
    }
};

const fetchLikes = (endpoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endpoint,
        schema
    }
});

const fetchDiscounts = (endpoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNT_REQUEST,
            types.FETCH_DISCOUNT_SUCCESS,
            types.FETCH_DISCOUNT_FAILURE
        ],
        endpoint,
        schema
    }
});

const reducer = (state = {}, action) => {
    switch (action.type) {
        // TODO
        case types.FETCH_LIKES_REQUEST:
        case types.FETCH_LIKES_SUCCESS:
        case types.FETCH_LIKES_FAILURE:
        default:
            return state;
    }
};

export default reducer;