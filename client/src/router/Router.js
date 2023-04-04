import HeaderOnly from '~/Layout/HeaderOnly';
import { configRouter } from '~/configs/router';
import Course from '~/pages/Course';
import Following from '~/pages/Following';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Solution from '~/pages/Solution';

const publicRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.login, component: Following },
    { path: configRouter.register, component: Following },
    { path: configRouter.course, component: Login, layout: HeaderOnly },
    { path: configRouter.solution, component: Login, layout: HeaderOnly },
    { path: configRouter.profile, component: Login, layout: HeaderOnly },
];
const privateRoutes = [
    { path: configRouter.home, component: Home },
    { path: configRouter.login, component: Following },
    { path: configRouter.register, component: Following },
    { path: configRouter.course, component: Course },
    { path: configRouter.solution, component: Solution },
    { path: configRouter.profile, component: Profile },
];
export { publicRoutes, privateRoutes };
