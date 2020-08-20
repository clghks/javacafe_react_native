import React, { useState, useCallback, useRef } from 'react';
import { Animated, Text, TextInput, Button, View, SafeAreaView, StyleSheet, FlatList } from 'react-native';


const TranslateView = ({item, removeTodo}) => {
  const translateAnimation = useRef(new Animated.Value(0)).current 

  const animated = useCallback(() => {
    Animated.timing(translateAnimation, {
      toValue: -1000,
      duration: 1000
    }).start(() => removeTodo(item.text));
  }, [translateAnimation, removeTodo, item]);

  return (
    <Animated.View
      style={{
        flex: 1,
        flexDirection: "row",
        transform: [{translateX: translateAnimation}],
      }}
    >
      <Text style={{flex: 1}}>{item.text}</Text>
      <Button style={{flex: 1}} title="Remove" onPress={animated} />
    </Animated.View>
  );
}

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodo = useCallback(() => {
    setTodoList([...todoList, {text: todo}])
    setTodo("")
  }, [todo, todoList]);

  const removeTodo = useCallback((text) => {
    setTodoList(todoList.filter((item) => item.text !== text))
  }, [todoList])

  const renderItem = ({ item }) => (
    <TranslateView  item={item} removeTodo={removeTodo} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editView}>
        <TextInput style={styles.todoInput} placeholder="할일을 입력하세요~!" value={todo} onChangeText={text => setTodo(text)} />
        <Button title="Add" onPress={addTodo} />
      </View>

      <FlatList
        style={styles.listView}
        data={todoList}
        keyExtractor={(item) => item.text}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  editView: {
    flex: 1,
    flexDirection: "row"
  },
  todoInput: {
    flex: 1,
    height: 40
  },
  listView: {
    marginTop: 20,
    flex: 10
  }
});


export default App;
