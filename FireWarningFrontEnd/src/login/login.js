import React, { Component } from 'react'
import { Layout, Form, Input, Button, Radio, Row, Col } from 'antd'
import './login.css'

const FormItem = Form.Item;
const { Header, Footer, Content } = Layout;
class Login extends Component {
    render() {
        return (
            <div style={{ width: "100%" , height: "100%" }}>
                <Layout>
                    <Header>Header</Header>
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
                    <Footer>Footer</Footer>

                </Layout>
            </div>
        );
    }
}

export default Login;
