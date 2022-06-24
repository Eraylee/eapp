import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

import './style.less';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRootDispatch, authServiceThunks } from '@eapp/client/service';

const Login: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useRootDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    const res = await dispatch(authServiceThunks.login(values));
    if (res) {
      const redirectUrl =
        (location?.state as any)?.from?.pathname || '/dashboard';
      nav(redirectUrl);
    }
    setLoading(false);
  };

  return (
    <div className="login-page-root">
      <Card bordered={false}>
        <Form className="login-form" onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="密码"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
