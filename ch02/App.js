import React, { useState, useCallback } from 'react';
import { Text, TextInput, Button, View, SafeAreaView, StyleSheet, FlatList } from 'react-native';

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
    <View style={styles.todoView}>
      <Text style={{flex: 1}}>{item.text}</Text>
      <Button title="Remove" onPress={() => removeTodo(item.text)} />
    </View>
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
  todoView: {
    flex: 1,
    flexDirection: "row"
  },
  listView: {
    marginTop: 20,
    flex: 10
  }
});


export default App;
