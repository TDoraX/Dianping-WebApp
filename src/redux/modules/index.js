import { combineReducer } from 'redux';
import entities from './entities';
import home from './home';
import detail from './detail';
import app from './app';

// 合并Root Reducer
const rootReducer = combineReducer({
    entities,
    home,
    detail,
    app
});

export default rootReducer;