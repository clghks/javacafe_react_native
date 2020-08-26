import React, { useState, useCallback, useRef } from 'react';
import {
  Animated,
  Text,
  TextInput,
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const TranslateView = ({ item, removeTodo }) => {
  const translateAnimation = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const swipeLeft = useCallback((state) => animated(), [animated]);

  const animated = useCallback(() => {
    Animated.timing(translateAnimation, {
      toValue: -1000,
      duration: 1000,
    }).start(() => removeTodo(item.text));
  }, [translateAnimation, removeTodo, item]);

  return (
    <GestureRecognizer onSwipeLeft={swipeLeft}>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          transform: [{ translateX: translateAnimation }],
        }}>
        <Text style={{ flex: 1 }}>{item.text}</Text>
        <Button style={{ flex: 1 }} title="Remove" onPress={animated} />
      </Animated.View>
    </GestureRecognizer>
  );
};

const App = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = useCallback(() => {
    setTodoList([...todoList, { text: todo }]);
    setTodo('');
  }, [todo, todoList]);

  const removeTodo = useCallback(
    (text) => {
      setTodoList(todoList.filter((item) => item.text !== text));
    },
    [todoList]
  );

  const renderItem = ({ item }) => (
    <TranslateView item={item} removeTodo={removeTodo} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editView}>
        <TextInput
          style={styles.todoInput}
          placeholder="할일을 입력하세요~!"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <Button style={styles.addButton} title="Add" onPress={addTodo} />
      </View>

      <FlatList
        style={styles.listView}
        data={todoList}
        keyExtractor={(item) => item.text}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  editView: {
    flex: 1,
    flexDirection: 'row',
  },
  todoInput: {
    flex: 1,
    height: 40,
  },
  addButton: {
    flex: 1,
    height: 40,
  },
  listView: {
    marginTop: 20,
    flex: 100,
  },
});

export default App;
