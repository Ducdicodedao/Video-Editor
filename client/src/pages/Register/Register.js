import classNames from 'classnames/bind';
import styles from './Register.module.scss';
//component
import { useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Register() {
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Register, setRegister] = useState(true);
    const [Message, setMessage] = useState('');
    return (
        <div className={cx('wrapper')}>
            <h1>Sign up</h1>
            <form className={cx('form-signup')}>
                <input
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    name="email"
                />{' '}
                <br></br>
                <input
                    placeholder="Tên người dùng"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    name="username"
                />{' '}
                <br></br>
                <input
                    placeholder="Số điện thoại"
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    name="phone"
                />{' '}
                <br></br>
                <input
                    placeholder="Mật khẩu"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    name="pass"
                />{' '}
                <br></br>
                <input
                    placeholder="Xác nhận mật khẩu"
                    onChange={(e) => {
                        setRePassword(e.target.value);
                    }}
                    name="re-pass"
                />
                <p>
                    Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của
                    chúng tôi.
                </p>
            </form>
            <Button className={cx('btn-signup')}>Đăng ký</Button>
            <div className={cx('con-signin')} style={{ fontSize: 15 }}>
                <span>Nếu bạn đã có tài khoản?</span>
                <a href="http://localhost:3000/login" className={cx('signin')}>
                    Đăng nhập
                </a>
            </div>
        </div>
    );
}

export default Register;
