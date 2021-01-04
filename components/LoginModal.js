import React, { useState } from 'react';
import { Input, Button, Form, Modal, Tooltip } from 'antd';
import formstyles from '../styles/registerModal.module.css';

export default function LoginModal({ visible, closeModal, redirect }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
      <Form form={form} className={formstyles.form}>
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
