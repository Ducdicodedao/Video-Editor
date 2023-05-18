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
import Media from '~/pages/Media';
import VideosUpload from '~/Layout/Components/videosUpload/videosUpload';
import MediaComponent from '~/Layout/Components/MediaComponent/MediaComponent';
import AudioComponent from '~/Layout/Components/AudioComponent/AudioComponent';
import WatermarkComponent from '~/Layout/Components/WatermarkComponent/WatermarkComponent';
import TemplateComponent from '~/Layout/Components/TemplateComponent/TemplateComponent';
const publicRoutes = [
    // { path: configRouter.home, component: Home },
    { path: configRouter.home, component: MediaComponent },
    { path: configRouter.media, component: MediaComponent },
    { path: configRouter.storage, component: Storage },
    { path: configRouter.feedback, component: Feedback },
    { path: configRouter.login, component: Login, Layout: HeaderOnly },
    { path: configRouter.register, component: Register, Layout: HeaderOnly },
    { path: configRouter.concatenate, component: Concatenate },
    { path: configRouter.cut, component: Cut },
    { path: configRouter.profile, component: Login },
    { path: configRouter.audio, component: AudioComponent },
    { path: configRouter.watermark, component: WatermarkComponent },
    { path: configRouter.template, component: TemplateComponent },
];
export { publicRoutes };
