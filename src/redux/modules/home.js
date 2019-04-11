import {combineReducers} from 'redux';
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
    // 获取“猜你喜欢”请求
    FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
    // 获取“猜你喜欢”请求成功
    FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
    // 获取“猜你喜欢”请求失败
    FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',
    // 获取“特惠信息”请求
    FETCH_DISCOUNTS_REQUEST: 'HOME/FETCH_DISCOUNTS_REQUEST',
    // 获取“特惠信息”请求成功
    FETCH_DISCOUNTS_SUCCESS: 'HOME/FETCH_DISCOUNTS_SUCCESS',
    // 获取“特惠信息”请求失败
    FETCH_DISCOUNTS_FAILURE: 'HOME/FETCH_DISCOUNTS_FAILURE',
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
            const {ids} = getState().home.discounts;
            if (ids.length > 0) {
                return null;
            }
            const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
            return dispatch(fetchDiscounts(endpoint));
        };
    }
};

const fetchLikes = endpoint => ({
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

const fetchDiscounts = endpoint => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNTS_REQUEST,
            types.FETCH_DISCOUNTS_SUCCESS,
            types.FETCH_DISCOUNTS_FAILURE
        ],
        endpoint,
        schema
    }
});

// 猜你喜欢 - Reducer
const likes = (state = initialState.likes, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            return {...state, isFetching: true};
        case types.FETCH_LIKES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                pageCount: state.pageCount + 1,
                ids: state.ids.concat(action.response.ids)
            };
        case types.FETCH_LIKES_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
};

// 特惠信息 - Reducer
const discounts = (state = initialState.discounts, action) => {
    switch (action.type) {
        case types.FETCH_DISCOUNTS_REQUEST:
            return {...state, isFetching: true};
        case types.FETCH_DISCOUNTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            };
        case types.FETCH_DISCOUNTS_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
};

const reducer = combineReducers({
    discounts,
    likes
});

export default reducer;

// Selectors
// 获取“猜你喜欢”state
export const getLikes = state => {
    return state.home.likes.ids.map(id => {
        return state.entities.products[id];
    });
};

// 获取“特惠信息”state
export const getDiscounts = state => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id];
    });
};

// 获取“猜你喜欢”分页码
export const getPageCountOfLikes = state => {
    return state.home.likes.pageCount;
};

