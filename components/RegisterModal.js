/*eslint no-undef: 0*/
import styles from '../styles/registerModal.module.css';
import { Input, Button, Form, Modal, Tooltip } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';

export default function RegisterModal(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  // called when form content is valid
  const onFinish = (values) => {
    setLoading(true);
    delete values["confirm"]
    console.log('Received values of form:'); // values.firstName | values.lastName | values.email | values.password
    console.log(values)
    addAccount(values).then(()=>{
      setLoading(false);
      setRegistered(true);
    })
  };

  const onClose = () =>{
    form.resetFields();
    setLoading(false);
    if(registered){
      props.onFinish();
      setTimeout(() => {
        setRegistered(false);
      },500)
    }
    else{
      props.closeModal();
    }
  }

  function isAlphaNumeric(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(str);
  }

  return (
    <Modal
      centered
      visible={props.registerModalVisible}
      onCancel={() => {
        onClose()
      }}
      width={400}
      footer={null}
      maskClosable={false}>

      {registered &&
        <div className={styles.registeredMessage}>
          <CheckCircleTwoTone className={styles.checkCircle} twoToneColor="#52c41a"/>
          <h1>Success!</h1>
          <p>Your account has been registered!</p>
          <Button type="primary" className={styles.btnSuccess} onClick={()=>{
            onClose();
          }}>OK</Button>
        </div>
      }

      {!registered &&
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
              },
              {
                max: 35,
                message: 'First name is too long!'
              }
            ]}>
            <Input id="firstName" placeholder="first name" className={"formInput"}/>
          </Form.Item>

          <Form.Item
            name="lastName"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
                whitespace: true
              },
              {
                max: 35,
                message: 'Last name is too long!'
              }
            ]}>
            <Input id="lastName" placeholder="last name" className={"formInput"} />
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
                max: 320,
                message: 'E-mail is too long!'
              },
              {
                validator: async (rule, value) => {
                  if (value) {
                    const emailStatus = await checkEmailDuplicate(value);
                    return emailStatus;
                  }
                  return Promise.resolve();
                }
              }
            ]}>
            <Input id="email" placeholder="e-mail" className={"formInput"} />
          </Form.Item>

          <Tooltip
            title="Password must be 6-12 characters and must only be alphanumeric!"
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
                {
                  max: 12,
                  message: 'Password is too long!'
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
              <Input.Password id="password" placeholder="password" className={"formInput"} />
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
              className={"formInput"}
            />
          </Form.Item>

          {/* <Form.Item > */}
          <div className={styles.submitFormItem}>
            <Button
              type="primary"
              htmlType="submit"
              id="btnSubmit"
              className={[styles.btnSubmit, "btnSubmit"]}
              loading={loading}>
              SIGN UP
            </Button>
          </div>
          {/* </Form.Item> */}
          <div className={styles.registerFooter}>
            Already a member?{' '}
            <Button
              type="text"
              className={[styles.btnRedirect, "btnRedirect"]}
              onClick={() => {
                form.resetFields();
                props.redirectToLoginModal();
              }}>
              Sign in
            </Button>
          </div>
        </Form>
    }
    </Modal>
  );
}

async function checkEmailDuplicate(emailInput) {
  const res = await fetch('/api/emails/');
  const results = await res.json();

  let emailAlreadyRegistered = false;
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

async function addAccount(newAccount){
  // insert new account info in db
  const accountString = JSON.stringify(newAccount);

  const res = await fetch('/api/register/' + accountString);
  const results = await res.json();

  console.log('results');
  console.log(results);
}
