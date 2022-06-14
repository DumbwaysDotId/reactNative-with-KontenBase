import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { setAuthToken } from './src/config/api';

//Import Screen
import Todos from './src/screens/Todos';
import Register from './src/screens/Register';
import Login from './src/screens/Login';

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const loggedChecked = async () => {
    try {
      const value = await AsyncStorage.getItem('token');

      if (value != null) {
        setAuthToken(value);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    loggedChecked();
  }, []);

  return (
    <>
      {isLogged == false ? (
        <>
          {isRegister ? (
            <Register
              setIsRegister={setIsRegister}
              loggedChecked={loggedChecked}
            />
          ) : (
            <Login
              setIsRegister={setIsRegister}
              loggedChecked={loggedChecked}
            />
          )}
        </>
      ) : (
        <Todos loggedChecked={loggedChecked} />
      )}
    </>
  );
}
