import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../Components/Header';
import ProfileEdit from './ProfileEdit';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <BrowserRouter>
          <Route path="/profile/edit" component={ ProfileEdit } />
        </BrowserRouter>
        <Header />
      </div>
    );
  }
}

export default Profile;
