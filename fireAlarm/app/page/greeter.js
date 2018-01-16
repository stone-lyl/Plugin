import React from 'react';
import axios from 'axios';
import config from './config.json';

import styles from './greeter.css';

export default class Greeter extends React.Component {
    state = {
        number: 2,
    };
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                number: 10,
            });
        }, 3000);
        this.getApprover('type_name', 231);
    };
    /**
    * 获取approver接口。
    * @param {type} type_name key,动态密码。product_info 产品编码。
    * @param {value} 产品编码信息，或者为选择的类型。
    */
    getApprover = (type, value) => {
        const url = `/ding/rp/get/approver?${type}=${value}`;
        axios.get(url)
            .then((resp) => {
                if (resp.data.errcode === 0 && resp.data.errmsg === 'ok') {
                    let approverId = [].concat(resp.data.approver);
                    this.setState({
                        number: 11,
                    });
                } else {
                    this.setState({
                        number: 11,
                    });
                    console.log(resp.data.errmsg);
                }
            }).catch(() => {
                console.log('获取审批人失败，请重试。');
                this.setState({
                    number: 122,
                });
            });
    }

    render() {
        return (
            <div className={styles.root}>
                {config.greetText}
                <h3>3</h3>
                <img src="../image/app" alt="png" />
                <h2> {this.state.number} </h2>
                <p className={styles.p}>{new Date().toTimeString()}</p>
            </div>
        )
    }
};