import React, {Component} from 'react';
import './style.css'

class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="lodaing__img"/>
                <span>正在加载...</span>
            </div>
        );
    }
}

export default Loading;