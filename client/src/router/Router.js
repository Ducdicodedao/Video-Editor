import HeaderOnly from '~/Layout/HeaderOnly';
import { configRouter } from '~/configs/router';
import Course from '~/pages/Course';
import Following from '~/pages/Following';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Cut from '~/pages/Cut';
import Register from '~/pages/Register';

const publicRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.login, component: Login, layout: HeaderOnly },
    { path: configRouter.register, component: Register, layout: HeaderOnly },
    { path: configRouter.course, component: Login, layout: HeaderOnly },
    { path: configRouter.cut, component: Cut },
    { path: configRouter.profile, component: Login, layout: HeaderOnly },
];
const privateRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.login, component: Following },
    { path: configRouter.register, component: Following },
    { path: configRouter.course, component: Course },
    { path: configRouter.solution, component: Cut },
    { path: configRouter.profile, component: Profile },
];
export { publicRoutes, privateRoutes };
