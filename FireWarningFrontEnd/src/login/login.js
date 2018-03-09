import React, { Component } from 'react'
import { Layout, Form, Input, Button, Radio, Row, Col } from 'antd'
import './login.css'

const FormItem = Form.Item;
const { Content } = Layout;
class Login extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Content className="login-contain" >
                        <div className="login-main">
                             <p>this is a login page</p>
                            <Form>
                                <FormItem label="Username" >
                                    <Input placeholder="Username" />
                                </FormItem>
                                <FormItem label="Password" type="password" >
                                    <Input placeholder="Password" />
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Log in
                            </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </Content>

                </Layout>
            </div>
        );
    }
}

export default Login;
