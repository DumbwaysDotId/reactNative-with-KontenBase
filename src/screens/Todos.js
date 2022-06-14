import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { ListItem, CheckBox, Header } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../config/api';

const Todos = ({ loggedChecked }) => {
  //Init State
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create Function to fetch
  const getTodos = async () => {
    try {
      setIsLoading(true);

      const { data: userData } = await API.get('/auth/user');
      const { data } = await API.get(`/Todo?owner=${userData._id}`);

      setUser(userData);

      if (data.length != 0) {
        setTodos(data);
      }

      setIsLoading(false);
      loggedChecked();
    } catch (error) {
      console.log(error);
    }
  };

  // Create LifeCycle
  useEffect(() => {
    //Function Exception
    getTodos();
  }, []);

  // Create HandleLogout Function
  const handleLogout = async () => {
    try {
      const response = await API.post('/auth/logout');

      if (response) {
        await AsyncStorage.removeItem('token');
        loggedChecked();
      }
    } catch (error) {
      console.log(error.response);
      await AsyncStorage.removeItem('token');
    }
  };

  //   Create Component List
  const _renderItem = ({ item }) => {
    return (
      <ListItem key={item._id.toString()} bottomDivider>
        <ListItem.Content>
          <ListItem.Title numberOfLines={1}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <CheckBox checked={item.isDone == true ? true : false} />
      </ListItem>
    );
  };

  return (
    <>
      <Header
        backgroundColor="#9b2226"
        centerComponent={{
          text: `Todos: ${user.firstName} ${user.lastName}`,
          style: { color: '#fff', paddingTop: 3 },
        }}
        rightComponent={{
          icon: 'logout',
          color: 'black',
          onPress: handleLogout,
        }}
      />
      {todos.length != 0 ? (
        <View style={style.container}>
          <FlatList
            data={todos}
            renderItem={_renderItem}
            keyExtractor={(item) => item._id.toString()}
            refreshing={isLoading}
            onRefresh={getTodos}
          />
        </View>
      ) : (
        <View style={style.noData}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getTodos} />
            }
          >
            <Text>No Data</Text>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Todos;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  noData: {
    alignItems: 'center',
  },
  logout: {
    color: '#fff',
    backgroundColor: 'red',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});
