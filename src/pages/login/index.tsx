/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, Card, Form, Space, useFormApi, Avatar, Toast, Tooltip } from '@douyinfe/semi-ui';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { getCsrfToken, signIn } from 'next-auth/react';
// import { NextSeo } from 'next-seo';
import { FormattedMessage } from 'react-intl';
// import { PageEnum } from '@/enums/app.enum';
import { useLocale } from '@/locales';
import { login } from '@/config/api/user';
import systemConfig from '@/config'
import { setLocalStorage } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import userStateStore from '@/store/user';

export default function Login() {
	const { formatMessage } = useLocale()
	const navigate = useNavigate();
  const [initValues] = useState({
    credential: '',
    password: '',
  });
  const { updateLoginState } = userStateStore(state => state);
  const [loading, setLoading] = useState(false);
  const {  authKey } = systemConfig
  function ComponentUsingFormApi() {
    const formApi = useFormApi();
    function onChange() {
      formApi.setValue('password', '123456');
    }
    return (
      <Space spacing={12} style={{display:'flex',justifyContent:'space-between'}}>
        {/* <Button onClick={onChange}>Set Password</Button> */}
          <Button className='signUpButton' theme="borderless" type="primary" >
            {formatMessage({ id: 'login.signUp' })}
          </Button>
          <Button theme="solid" type="primary" htmlType="submit" loading={loading}>
            {formatMessage({ id: 'login.signIn' })}
          </Button>
      </Space>
    );
  }
	const formValidate = (values) => {
		const errors = {} as any
		if (values.credential == null) {
			errors.credential = formatMessage({ id: 'login.required' })
		}
    if (values.password == null) {
			errors.password = formatMessage({ id: 'login.required' })
		}
		if (Object.keys(errors).length === 0) {
			return null
		}
		return errors
	}
  async function onSubmit(values) {
    setLoading(true);
    await login(values).then(res=>{
      setLoading(false);
      const {token} = res.data;
      setLocalStorage(authKey,token)
      updateLoginState({
        logged: true,
        token: token 
      })
      navigate('/')
    }).catch(err=>{
      setLoading(false);
      console.log(err)
    });
      // router.replace(res.url).then(() => {});
  }

  return (
      <>
      <div className="flex-around">
        {/* <NextSeo title="Sign in" /> */}
        <Form initValues={initValues} onSubmit={onSubmit} validateFields={formValidate}>
          <Card
            style={{ width: 360 }}
            title={
              <Card.Meta
                title={<FormattedMessage id="login.title" />}
                description={<FormattedMessage id="login.desc" />}
                avatar={<Avatar color="red">Wj</Avatar>}
              />
            }
            footerLine
            footer={<ComponentUsingFormApi />}
          >
            <input name="csrfToken" type="hidden" />
            <Form.Input
              field="credential"
              label={<FormattedMessage id="login.username" />}
              placeholder={formatMessage({ id: 'login.username' })}
              rules={[{ required: true, message: formatMessage({ id: 'login.required' }) }]}
              prefix={<IconUser />}
            />
            <Form.Input
              field="password"
              label={<FormattedMessage id="login.password" />}
              placeholder={formatMessage({ id: 'login.password' })}
              rules={[{ required: true, message: formatMessage({ id: 'login.required' }) }]}
              mode="password"
              prefix={<IconLock />}
            />
          </Card>
        </Form>
      </div>
      </>
  );
}