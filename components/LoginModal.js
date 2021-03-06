import React, { useState } from 'react';
import { Input, Button, Form, Modal } from 'antd';
import formstyles from '../styles/registerModal.module.css';
// import { verifyAccount } from '../util/verifyUser'
import { signIn } from 'next-auth/client';

export default function LoginModal({ visible, closeModal, redirect }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const accountString = JSON.stringify(values);
    const res = await fetch('/api/verify/' + accountString);
    const resJSON = await res.json();
    const decision = resJSON.decision;

    if (decision === 'success') {
      await signIn('credentials', { email: values['e-mail'], password: values.password });
      setIsError(false);
    } else if (decision === 'error') {
      setIsError(true);
    }

    setLoading(false);
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setIsError(false);
        closeModal();
      }}
      width={400}
      footer={null}
      maskClosable={false}>
      <Form
        form={form}
        className={formstyles.form}
        onFinish={(values) => {
          onFinish(values);
        }}>
        <h1>Login</h1>

        <Form.Item
          name="e-mail"
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
          <Input id="email" placeholder="e-mail" className="formInput" style={{ borderRadius: '7px' }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password id="password" className="formInput" placeholder="password" style={{ borderRadius: '7px' }} />
        </Form.Item>

        {isError && <p style={{ color: 'red' }}> Account not found or password is wrong. </p>}

        <div className={formstyles.submitFormItem}>
          <Button
            type="primary"
            htmlType="submit"
            id="btnSubmit"
            className={[formstyles.btnSubmit, "btnSubmit"]}
            loading={loading}>
            SIGN IN
          </Button>
        </div>

        <div className={formstyles.registerFooter}>
          Not a member?{' '}
          <Button
            type="text"
            className={[formstyles.btnRedirect, "btnRedirect"]}
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
