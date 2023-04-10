import classNames from 'classnames/bind';
import styles from './Register.module.scss';

//component
import { useState, useContext } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpRequest from '../../util/HttpRequest.js';
import { Auth } from '~/contexts/authContext';

const cx = classNames.bind(styles);
function Register() {
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    // const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    // const [Register, setRegister] = useState(true);
    const [Message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { state, dispatch } = useContext(Auth);
    const { userInfo } = state;

    const handleSubmit = async () => {
        if (Password !== RePassword) {
            setMessage('Password and RePassword not same');
            setOpen(true);
            return;
        }
        if (Email.trim() === '' || Name.trim() === '' || Password === '' || RePassword === '') {
            setMessage('Empty Field');
            setOpen(true);
            return;
        }
        try {
            const { data } = await httpRequest.post('/api/auth/signup', {
                name: Name,
                email: Email,
                password: Password,
            });
            dispatch({
                type: 'USER_SIGNIN',
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/login');
        } catch (err) {
            setMessage('Email is already Exist');
            setOpen(true);
            return;
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

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
                {/* <input
                    placeholder="Số điện thoại"
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    name="phone"
                />{' '}
                <br></br> */}
                <input
                    placeholder="Mật khẩu"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    name="pass"
                />{' '}
                <br></br>
                <input
                    placeholder="Xác nhận mật khẩu"
                    type="password"
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
            <Button className={cx('btn-signup')} onClick={handleSubmit}>
                Đăng ký
            </Button>
            <div className={cx('con-signin')} style={{ fontSize: 15, cursor: 'pointer' }}>
                <span>Already have account?</span>
                <div
                    className={cx('signin')}
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Login Now
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {Message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Register;
