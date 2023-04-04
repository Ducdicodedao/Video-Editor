import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/router/Router';
import DefaultLayout from '~/Layout/DefaultLayout';
function App() {
    const user = false;
    let Comp = publicRoutes;
    if (user) {
        Comp = privateRoutes;
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    {Comp.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else {
                            Layout = DefaultLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
