import React, { useState } from 'react';
import { Input, Button, Form, Modal, Tooltip } from 'antd';
import formstyles from '../styles/registerModal.module.css';
import Router from 'next/router';
import Cookies from 'js-cookie';

export default function LoginModal({ visible, closeModal, redirect}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await authenticate(values);
    setLoading(false);
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={() => {
        form.resetFields();
        closeModal();
      }}
      width={400}
      footer={null}>
      <Form
        form={form}
        className={formstyles.form}
        onFinish={(values) => {
          onFinish(values);
        }}>
        <h1>Login</h1>

        <Form.Item
          name="e-mail"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid e-mail!'
            },
            {
              required: true,
              message: 'Please input your e-mail!'
            }
          ]}>
          <Input placeholder="e-mail" style={{ borderRadius: '7px' }} />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input id="password" placeholder="password" style={{ borderRadius: '7px' }} />
        </Form.Item>

        <div className={formstyles.submitFormItem}>
          <Button
            type="primary"
            htmlType="submit"
            id="btnSubmit"
            className={formstyles.btnSubmit}
            loading={loading}>
            SIGN IN
          </Button>
        </div>

        <div className={formstyles.registerFooter}>
          Not a member?{' '}
          <Button
            type="text"
            className={formstyles.btnRedirect}
            onClick={() => {
              form.resetFields();
              redirect();
            }}>
            Sign up
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

async function authenticate(values) {
  const accountString = JSON.stringify(values);

  const api = await fetch('/api/login/' + accountString);

  let result = await api.json();
  console.log(result)
  if (result.success && result.token) {
    Cookies.set('token', result.token);
    // window.location.href = referer ? referer : "/";
    // const pathUrl = referer ? referer.lastIndexOf("/") : "/";
    Router.push("/");
  } else {
    console.log('fail');
  }
  
  return result;
}