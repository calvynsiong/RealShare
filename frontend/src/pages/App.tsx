import '../index.css';
// libraries
import React, { useContext, useMemo, useReducer, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// layouts
// types
import axios from 'axios';
import { createContext } from 'react';
import { BASE_URL } from '../utils/constants';
import {
  PostActions,
  initialPostsState,
  IPostState,
  postReducer,
} from '../utils/reducers';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Profile from './profile/Profile';
import Home from './home/Home';
import Register from './register/Register';
import Login from './login/LoginPage';

axios.defaults.baseURL = BASE_URL;

const queryClient = new QueryClient();

// * Interfaces
interface IFollows {
  id: string;
  username: string;
  avatar: string;
  email: string;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  status: string;
  followers?: IFollows[];
  following?: IFollows[];
  location?: string[];
  tags?: string[];
}
interface IUserContext {
  userData: IUser | null;
  allUsers: IUser[] | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
  postState: IPostState;
  postDispatch: React.Dispatch<PostActions>;
}

//  * Context
export const UserContext = createContext<IUserContext | null>(null);
export const useUserContext = (): IUserContext => useContext(UserContext)!;

function App() {
  //  * State

  const [userData, setUserData] = useState<IUser | null>(null);
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const [postState, postDispatch] = useReducer(postReducer, initialPostsState);

  axios.defaults.baseURL = BASE_URL;
  const globalContext = useMemo(
    () => ({
      userData,
      allUsers,
      setUserData,
      setAllUsers,
      postState,
      postDispatch,
    }),
    [userData, allUsers, setUserData, setAllUsers, postState, postDispatch]
  );
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <UserContext.Provider value={globalContext}>
        <ToastContainer></ToastContainer>;
        <Router>
          <Switch>
            <Route exact path='/'>
              {userData ? <Home /> : <Register />}
            </Route>
            <Route path='/login'>
              {userData ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path='/register'>
              {userData ? <Redirect to='/' /> : <Register />}
            </Route>
            <Route exact path='/profile/:pid'>
              <Profile />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
