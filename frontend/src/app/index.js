import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NavBar, Sidebar, SignIn, SignUp, PlayAlbum, PlayListByLoveSongs } from "../components";
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

        <Switch>
          <Route path="/post/create" exact component={PostInsert} />
          <Route path="/post" exact component={Home} />
          {/* <Route path="*" exact component={Home}/>  */}
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/playList" exact component={PlayAlbum} />
          <Route path="/playListbyLove" exact component={PlayListByLoveSongs} />

        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
