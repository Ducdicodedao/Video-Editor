import HeaderOnly from '~/Layout/HeaderOnly';
import { configRouter } from '~/configs/router';
import Concatenate from '~/pages/Concatenate';
import Following from '~/pages/Following';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Cut from '~/pages/Cut';
import Register from '~/pages/Register';
import Storage from '~/pages/Storage';
import Feedback from '~/pages/Feedback';

const publicRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.storage, component: Storage },
    { path: configRouter.feedback, component: Feedback },
    { path: configRouter.login, component: Login, layout: HeaderOnly },
    { path: configRouter.register, component: Register, layout: HeaderOnly },
    { path: configRouter.concatenate, component: Concatenate },
    { path: configRouter.cut, component: Cut },
    { path: configRouter.profile, component: Login, layout: HeaderOnly },
];
const privateRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.storage, component: Storage },
    { path: configRouter.feedback, component: Feedback },
    { path: configRouter.login, component: Login, layout: HeaderOnly },
    { path: configRouter.register, component: Register, layout: HeaderOnly },
    { path: configRouter.concatenate, component: Concatenate },
    { path: configRouter.cut, component: Cut },
    { path: configRouter.profile, component: Login, layout: HeaderOnly },
];
export { publicRoutes, privateRoutes };
