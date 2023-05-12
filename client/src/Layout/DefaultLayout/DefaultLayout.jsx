import classNames from 'classnames/bind';
import Video from '../Components/Video';
import styles from './DefaultLayout.module.scss';

import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
                <Video route={'trim'}></Video>
            </div>
        </div>
    );
}

export default DefaultLayout;
