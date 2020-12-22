import styles from '../styles/registerModal.module.css';
import { Row, Col, Input, Button, Form } from 'antd';

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterModal(props) {
  // const router = useRouter();
  const [form] = Form.useForm();

  // called when form content is valid
  const onFinish = (values) => {
    console.log('Received values of form: ', values); // values.firstName | values.lastName | values.email | values.password
  };

  return (
    <Form form={form} onFinish={onFinish} className={styles.form}>
      <h1>Register</h1>

      <Form.Item
        name="firstName"
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
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true
          }
        ]}>
        <Input placeholder="last name" style={{ borderRadius: '7px' }}/>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not a valid e-mail!'
          },
          {
            required: true,
            message: 'Please input your e-mail!'
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
        <Input placeholder="e-mail" style={{ borderRadius: '7px' }} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
        // hasFeedback
      >
        <Input.Password placeholder="password" style={{ borderRadius: '7px' }} />
      </Form.Item>

      <Form.Item
        name="confirm"
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
        ]}
        // hasFeedback
      >
        <Input.Password placeholder="confirm password" style={{ borderRadius: '7px' }} />
      </Form.Item>

      <Form.Item className={styles.submitFormItem}>
        <Button type="primary" htmlType="submit" className={styles.btnSubmit}>
          SIGN UP
        </Button>
      </Form.Item>
      <div className={styles.footerMessage}>
        Already a member? <Button type="text" className={styles.btnRedirect} onClick={()=>{
          props.redirectToLoginModal();
        }}>Sign in</Button>
      </div>
    </Form>
  );
}
