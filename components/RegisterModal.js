/*eslint no-undef: 0*/

import styles from '../styles/registerModal.module.css';
import { Input, Button, Form, Modal, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function RegisterModal(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // called when form content is valid
  const onFinish = (values) => {
    console.log('Received values of form: ', values); // values.firstName | values.lastName | values.email | values.password
    setLoading(true);
    setTimeout(() => {
      // setVisible(false);
      props.onFinish();
      setLoading(false);
      form.resetFields();
    }, 2000);
  };

  function isAlphaNumeric(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(str);
  }

  return (
    <Modal
      centered
      visible={props.registerModalVisible}
      onCancel={() => {
        form.resetFields();
        props.closeModal();
      }}
      width={400}
      footer={null}>
      <Form
        form={form}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        className={styles.form}
        // {...layout}
      >
        <h1>Register</h1>

        <Form.Item
          name="firstName"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
              whitespace: true
            }
          ]}>
          <Input placeholder="first name" style={{ borderRadius: '7px' }} />
        </Form.Item>

        <Form.Item
          name="lastName"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
              whitespace: true
            }
          ]}>
          <Input id="lastName" placeholder="last name" style={{ borderRadius: '7px' }} />
        </Form.Item>

        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid e-mail!'
            },
            {
              required: true,
              message: 'Please input your e-mail!'
            },
            {
              validator: async (rule, value) => {
                if (value) {
                  var emailStatus = await checkEmailDuplicate(value);
                  return emailStatus;
                }
                return Promise.resolve();
              }
            }
          ]}>
          <Input id="email" placeholder="e-mail" style={{ borderRadius: '7px' }} />
        </Form.Item>

        <Tooltip
          title="Password must be at least 6 characters and alphanumeric!"
          placement="top"
          name="password"
          trigger={["focus"]}>
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              },
              () => ({
                validator(rule, value) {
                  if (!value || value.length >= 6) {
                    if (value && !isAlphaNumeric(value)) {
                      return Promise.reject('Password must be alphanumeric!');
                    }
                    return Promise.resolve();
                  } else if (value.length > 0) {
                    return Promise.reject('Password is too short!');
                  }
                  return Promise.resolve();
                }
              })
            ]}>
            <Input.Password id="password" placeholder="password" style={{ borderRadius: '7px' }} />
          </Form.Item>
        </Tooltip>
        <Form.Item
          name="confirm"
          hasFeedback
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              }
            })
          ]}>
          <Input.Password
            id="confirm"
            placeholder="confirm password"
            style={{ borderRadius: '7px' }}
          />
        </Form.Item>

        {/* <Form.Item > */}
        <div className={styles.submitFormItem}>
          <Button
            type="primary"
            htmlType="submit"
            id="btnSubmit"
            className={styles.btnSubmit}
            loading={loading}>
            SIGN UP
          </Button>
        </div>
        {/* </Form.Item> */}
        <div className={styles.registerFooter}>
          Already a member?{' '}
          <Button
            type="text"
            className={styles.btnRedirect}
            onClick={() => {
              form.resetFields();
              props.redirectToLoginModal();
            }}>
            Sign in
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

async function checkEmailDuplicate(emailInput) {
  const res = await fetch('/api/emails/');
  const results = await res.json();
  console.log('results');
  console.log(results);

  var emailAlreadyRegistered = false;
  results.forEach((user) => {
    if (user.email == emailInput) {
      emailAlreadyRegistered = true;
    }
  });
  console.log('email found status: ' + emailAlreadyRegistered);
  if (emailAlreadyRegistered) {
    return Promise.reject('E-mail has already been registered!');
  }
  return Promise.resolve();
}
