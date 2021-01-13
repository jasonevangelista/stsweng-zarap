/*eslint no-undef: 0*/
import styles from '../styles/registerModal.module.css';
import { Input, Button, Form, Modal, Tooltip, Checkbox } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';

export default function RegisterModal(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // const [registered, setRegistered] = useState(false);

  // called when form content is valid
  const onFinish = (values) => {
    // setLoading(true);
    // delete values["confirm"]
    // console.log('Received values of form:'); // values.firstName | values.lastName | values.email | values.password
    // console.log(values)
    // addAccount(values).then(()=>{
    //   setLoading(false);
    //   setRegistered(true);
    // })
    props.closeModal();
  };

  const onClose = () =>{
    form.resetFields();
    // setLoading(false);
    // if(registered){
    //   props.onFinish();
    //   setTimeout(() => {
    //     setRegistered(false);
    //   },500)
    // }
    // else{
      props.closeModal();
    // }
  }

  const onClickCheckbox = (e) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);
  };

  function isAlphaNumeric(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(str);
  }

  return (
    <Modal
      centered
      visible={props.profileModalVisible}
      onCancel={() => {
        onClose()
      }}
      width={400}
      footer={null}
      maskClosable={false}>

      {/* {registered &&
        <div className={styles.registeredMessage}>
          <CheckCircleTwoTone style={{ fontSize: '50px'}} twoToneColor="#52c41a"/>
          <h1>Success!</h1>
          <p>Your account has been registered!</p>
          <Button type="primary" className={styles.btnSuccess} onClick={()=>{
            onClose();
          }}>OK</Button>
        </div>
      } */}

      {/* {!registered && */}
        <Form
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          className={styles.form}
          // {...layout}
          initialValues={
            {
              firstName: props.user.firstName,
              lastName: props.user.lastName
            }
          }
        >
          
          <h1>Update Profile</h1>

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
            {/* <Input placeholder="first name" defaultValue={props.user.firstName} style={{ borderRadius: '7px' }} /> */}
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
            {/* <Input id="lastName" placeholder="last name" defaultValue={props.user.lastName} style={{ borderRadius: '7px' }} /> */}
            <Input id="lastName" placeholder="last name" style={{ borderRadius: '7px' }} />

          </Form.Item>
            <Form.Item
              name="oldPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!'
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
              <Input.Password id="oldPassword" placeholder="password" style={{ borderRadius: '7px' }} />
            </Form.Item>
            <Checkbox checked={checked} onChange={onClickCheckbox}>Change Password</Checkbox>
            {checked && (
            <>
            <Tooltip
              title="Password must be at least 6 characters and must only be alphanumeric!"
              placement="top"
              name="newPassword"
              trigger={["focus"]}>
              <Form.Item
                name="newPassword"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please input your current password!'
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
                <Input.Password id="newPassword" placeholder="new password" style={{ borderRadius: '7px' }} />
              </Form.Item>
            </Tooltip>

            <Form.Item
              name="confirmNew"
              hasFeedback
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  }
                })
              ]}>
              <Input.Password
                id="confirm"
                placeholder="confirm new password"
                style={{ borderRadius: '7px' }}
              />
            </Form.Item>
          </>
          )}

          {/* <Form.Item > */}
          <div className={styles.submitFormItem}>
            <Button
              type="primary"
              htmlType="submit"
              id="btnSubmit"
              className={styles.btnSubmit}
              loading={loading}>
              UPDATE
            </Button>
          </div>
          {/* </Form.Item> */}
          {/* <div className={styles.registerFooter}>
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
          </div> */}
        </Form>
    {/* } */}
    </Modal>
  );
}

// async function addAccount(newAccount){
//   // insert new account info in db
//   var accountString = JSON.stringify(newAccount);

//   const res = await fetch('/api/register/' + accountString);
//   const results = await res.json();

//   console.log('results');
//   console.log(results);
// }
