import {get} from '../../utils/request';
import {schema} from "../modules/entities/products";
// 经过中间件处理的action所具有的标识
export const FETCH_DATA = 'FETCH DATA';

export default store => next => action => {
    const cappAPI = action[FETCH_DATA];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const {endpoint, schema, types} = callAPI;
    if (typeof endpoint !== 'string') {
        throw new Error('endpoint必须为字符串URL');
    }
    if (!schema) {
        throw new Error('领域实体的schema没有指定');
    }
    if (!Array.isArray(types) && types.length !== 3) {
        throw new Error('需要提供action type数组，且action type只能是3个')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('请检查action type是否全部为字符串');
    }

    const actionWith = data => {
        const finalAction = {...action, ...data}
        delete finalAction[FETCH_DATA];
        return finalAction;
    };

    const [requestType, successType, failureType] = types;

    next(actionWith({type: requestType}));
    return fetchData(endpoint, schema).then(
        response => next(actionWith({
            type: successType,
            response
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || '数据获取失败'
        }))
    )
};

// 执行网络请求
const fetchData = (endpoint, schema) => {
    return get(endpoint).then(data => {
        return normalizeData(data, schema);
    });
};

// 扁平化
const normalizeData = (data, schema) => {
    const {id, name} = schema;
    // 存储扁平化数据的对象
    let kvObj = {};
    // 存储数据中每一项的id
    let ids = [];
    if (Array.isArray(data)) {
        data.forEach(item => {
            kvObj[item[id]] = item;
            ids.push(item[id]);
        });
    } else {
        kvObj[data[id]] = data;
        ids.push(data[id]);
    }
    return {
        [name]: kvObj,
        ids
    }
};