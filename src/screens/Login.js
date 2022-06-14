import React, { useState } from 'react';
import { Input, Header, Text } from 'react-native-elements';
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../config/api';

export default function Login(props) {
  const { loggedChecked, setIsRegister } = props;

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPress = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post('/auth/login', body, config);

      if (response) {
        await AsyncStorage.setItem('token', response.data.token);
        loggedChecked();
      }
    } catch (error) {
      console.log('error :', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>
        Login
      </Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(value) => handleOnChange('email', value)}
        value={form.email}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.input}
        onChangeText={(value) => handleOnChange('password', value)}
        value={form.password}
      />
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.buttonSwitch} onPress={() => setIsRegister(true)}>
        Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#9b2226',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
  },
  input: {
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#e9d8a6',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonSwitch: {
    textAlign: 'center',
    marginTop: 13,
    color: 'white',
  },
});
