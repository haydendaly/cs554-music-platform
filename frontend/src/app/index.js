import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import {
  NavBar,
  Sidebar,
  SidebarRight,
  SignIn,
  SignUp,
  PlayAlbum,
  PlayListByLoveSongs,
} from "../components";
import { PostInsert, Home } from "../pages";
import { AuthProvider } from "../firebase/Auth";
// import { PlayAlbum } from "../components";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Sidebar />
        <SidebarRight />
        <Switch>
          <Route path="/post/create" exact component={PostInsert} />
          <Route path="/post" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/playList" exact component={PlayAlbum} />
          <Route path="/playListbyLove" exact component={PlayListByLoveSongs} />
          <Route path="/">
            <Redirect to="/post" />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
