import { combineReducers } from 'redux';
import products from './products';
import shops from './shops';
import orders from './orders';
import comments from './comments';

// 合并状态
const rootReducer = combineReducers({
    products,
    shops,
    orders,
    comments
});