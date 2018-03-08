import React, { Component } from 'react'
import { Form, Input, Button, Radio } from 'antd'
import './login.css'

const FormItem = Form.Item;

class Login extends Component {
    render() {
        return (
            <div className="login-contain" >
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
                                // disabled={hasErrors(getFieldsError())}
                            >
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
