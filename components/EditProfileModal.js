/*eslint no-undef: 0*/
import styles from '../styles/registerModal.module.css';
import { Input, Button, Form, Modal, Tooltip } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/router';

import { signIn, signOut } from 'next-auth/client';

export default function RegisterModal(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const router = useRouter();

  // called when form content is valid
  const onFinish = async (values) => {
    setLoading(true);
    delete values['confirmNew'];
    values['_id'] = props.user._id;
    // console.log("updated profile values:")
    // console.log(values)
    await updateAccount(values);
    // onClose();
    setLoading(false);
    setUpdated(true);

    // force re-sign in to update session
    await signOut();
    if (values['newPassword']) {
      await signIn('credentials', { email: props.user.email, password: values.newPassword });
    } else {
      await signIn('credentials', { email: props.user.email, password: values.oldPassword });
    }
  };

  const onClose = () => {
    form.resetFields();
    setLoading(false);
    if (updated) {
      // props.onFinish();
      props.closeModal();
      setTimeout(() => {
        setUpdated(false);
      }, 500);
    } else {
      props.closeModal();
    }
  };

  const reloadAfterUpdate = () => {
    onClose();
    router.reload();
  };

  const onClickCheckbox = (e) => {
    // console.log('checked = ', e.target.checked);
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
        onClose();
      }}
      width={400}
      footer={null}
      maskClosable={false}>
      {updated && (
        <div className={styles.registeredMessage}>
          <CheckCircleTwoTone style={{ fontSize: '50px' }} twoToneColor="#52c41a" />
          <h1>Success!</h1>
          <p>Your account details have been updated!</p>
          {/* <Button type="primary" className={styles.btnSuccess} onClick={()=>{
          // onClose();
          reloadAfterUpdate();
        }}>OK</Button> */}
        </div>
      )}

      {!updated && (
        <Form
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          className={styles.form}
          // {...layout}
          initialValues={{
            firstName: props.user.firstName,
            lastName: props.user.lastName
          }}>
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
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: 'Please input your current password!'
              },
              () => ({
                validator(rule, value) {
                  if (value) {
                    if (bcrypt.compareSync(value, props.user.password)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Incorrect password!');
                  }
                  return Promise.resolve();
                }
              })
            ]}>
            <Input.Password
              id="oldPassword"
              placeholder="password"
              style={{ borderRadius: '7px' }}
            />
          </Form.Item>
          {/* <Checkbox checked={checked} onChange={onClickCheckbox}>Change Password</Checkbox> */}

          <Tooltip
            title="Password must be at least 6 characters and must only be alphanumeric!"
            placement="top"
            name="newPassword"
            trigger={['focus']}>
            <Form.Item
              name="newPassword"
              hasFeedback
              rules={[
                // {
                //   required: true,
                //   message: 'Please input your current password!'
                // },
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
                }),
                ({ getFieldValue }) => ({
                  validateTrigger: 'onSubmit',
                  validator(rule, value) {
                    // console.log("comparing new and old")
                    if (value && getFieldValue('oldPassword') === value) {
                      return Promise.reject('Input is identical with old password!');
                    }
                    return Promise.resolve();
                  }
                })
              ]}>
              <Input.Password
                id="newPassword"
                placeholder="new password"
                style={{ borderRadius: '7px' }}
              />
            </Form.Item>
          </Tooltip>

          <Form.Item
            name="confirmNew"
            hasFeedback
            dependencies={['newPassword']}
            rules={[
              // {
              //   required: true,
              //   message: 'Please confirm your new password!'
              // },

              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const newPass = getFieldValue('newPassword');
                  // console.log('newpass: ' + newPass)
                  if (newPass && value) {
                    if (getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  } else if ((!newPass && value) || (newPass && !value)) {
                    return Promise.reject('The two passwords that you entered do not match!');
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}>
            <Input.Password
              id="confirm"
              placeholder="confirm new password"
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
              UPDATE
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

async function updateAccount(updatedDetails) {
  // insert new account info in db
  const detailsString = JSON.stringify(updatedDetails);

  const res = await fetch('/api/update/' + detailsString);
  const results = await res.json();

  // console.log('results');
  // console.log(results);
}

// async function addAccount(newAccount){
//   // insert new account info in db
//   var accountString = JSON.stringify(newAccount);

//   const res = await fetch('/api/register/' + accountString);
//   const results = await res.json();

//   console.log('results');
//   console.log(results);
// }
