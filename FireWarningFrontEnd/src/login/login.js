import React, { Component } from 'react'
import { Layout, Button, Radio, Row, Col } from 'antd'
import './login.css'
import logo from './../image/378.png';
const { Content } = Layout;
class Login extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Content className="login-contain" >
                        <div className="login-title"> Fire Warning System</div>
                        <div className="login-message">
                            <p className="login-info">this is a login page  </p>
                            <div className="login-triangle"></div>
                            <img src={logo} alt={"logo"} className="login-firemen"/>
                        </div>

                     
                        <div className="login-main">
                            
                            <form className="login-form">
                                <label for="username">Username：</label>
                                <input type="text" name="username" id="username" className="login-input" height="20px" width="20px"/>
                                <br />
                                <label for="password">Password:</label>
                                <input type="password" name="password" id="password" className="login-input"/>
                                <input type="submit" name="submit" value="log in" className="login-submit"/>
                            </form>

                        </div>
                    </Content>

                </Layout>
            </div>
        );
    }
}

export default Login;
