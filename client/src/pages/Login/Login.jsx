import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Snackbar,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    styled,
    TextField,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Auth } from '~/contexts/authContext';
import httpRequest from '../../util/HttpRequest.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '~/app/authSlice.js';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    margin: 10,
    marginTop: 30,
    backgroundColor: '#000000',
    borderRadius: 5,
    '&:hover': {
        backgroundColor: '#2C2C2C',
    },
}));
function Login() {
    const { isError, error, user } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        setOpen(false);
    };
    if (user !== null) {
        navigate('/');
    }
    const dispatch = useDispatch();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async () => {
        try {
            // const { data } = await httpRequest.post('/api/auth/signin', {
            //     email,
            //     password,
            // });
            dispatch(signIn({ email, password }));
            if (isError) {
                setMessage(error);
                setOpen(true);
            }
            // localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            setMessage('Invalid Email or Password');
            setOpen(true);
        }
    };
    return (
        <Grid container sx={{ width: '100wh', height: '100vh' }}>
            <Grid item xs={3} sx={{ textAlign: 'center', marginTop: '200px' }}>
                <h2>Welcome To Video Editor</h2>
                <div style={{ fontSize: 13 }}>
                    <p>powered by</p>
                    <p>Nguyen Minh Duc</p>
                    <p>Vu Thanh Sang</p>
                </div>
            </Grid>
            <Grid item xs={5}>
                <img
                    src="https://res.cloudinary.com/dccblvpyz/image/upload/v1684339694/clone-discord/wyrmrrbm2mo7ppk7qaew.jpg"
                    alt="img"
                    style={{ marginTop: '0px', width: '100%', height: '100%', objectFit: 'center' }}
                ></img>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ m: 1, width: '20ch', marginTop: '200px' }} variant="filled">
                    <TextField
                        label="Email"
                        sx={{ margin: 1 }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        sx={{ margin: 1 }}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <div style={{ display: 'flex', alignContent: 'space-between' }}>
                        <div
                            style={{ fontSize: 12, margin: '8px', cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            {' '}
                            Don't have an account? Register here!
                        </div>
                        {/* <a href="/home" style={{ fontSize: 12 }}>
                            Forgot Password?
                        </a> */}
                    </div>
                    <ColorButton variant="contained" onClick={handleSubmit}>
                        Sign In
                    </ColorButton>
                </FormControl>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {Message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default Login;
