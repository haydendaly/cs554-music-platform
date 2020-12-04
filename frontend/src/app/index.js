import React, { lazy, Suspense } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthProvider } from '../firebase/Auth'
// import { PlayAlbum } from "../components";
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'

const SignIn = lazy(() => import('../components/SignIn'))
const SignUp = lazy(() => import('../components/SignUp'))
const PlayAlbum = lazy(() => import('../components/playAlbum'))
const PlayListByLoveSongs = lazy(() =>
    import('../components/playListbyLoveSongs')
)
const PostInsert = lazy(() => import('../pages/PostInsert'))
const Home = lazy(() => import('../pages/Home'))
const UserProfile = lazy(() => import('../pages/UserProfile'))
const ChangePassword = lazy(() => import('../components/ChangePassword'))

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Sidebar />
                <SidebarRight />
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route
                            path="/post/create"
                            exact
                            component={PostInsert}
                        />
                        <Route path="/post" exact component={Home} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/playList" exact component={PlayAlbum} />
                        <Route
                            path="/playListbyLove"
                            exact
                            component={PlayListByLoveSongs}
                        />

                        <Route
                            path="/usershowprofile"
                            exact
                            component={() => <UserProfile page="ShowProfile" />}
                        />
                        <Route
                            path="/usereditprofile"
                            exact
                            component={() => <UserProfile page="EditProfile" />}
                        />
                        <Route
                            path="/userupdatepassword"
                            exact
                            component={ChangePassword}
                        />

                        <Route path="/">
                            <Redirect to="/post" />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </AuthProvider>
    )
}

export default App
