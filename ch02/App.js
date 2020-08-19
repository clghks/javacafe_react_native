import React, { useState, useCallback } from 'react';
import { Text, TextInput, View, Button, FlatList } from 'react-native';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = useCallback(() => {
    setTodoList([...todoList, {key: todo}])
    setTodo("")
  }, [todo, todoList])

  const removeTodo = useCallback((todoItem) => {
    setTodoList(todoList.filter((item) => item.key !== todoItem))
  }, [todoList])

  return (
    <View style={{padding: 10}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput
          style={{flex: 1}}
          placeholder="Type here to translate!"
          onChangeText={text => setTodo(text)}
          value={todo}
        />
        <Button title="Add" onPress={addTodo}></Button>
      </View>

      <FlatList
        data={todoList}
        renderItem={({item}) => 
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{flex: 1}}>{item.key}</Text>
          <Button title="Remove" onPress={() => removeTodo(item.key)}></Button></View>}
      />
    </View>
  );
}

export default App;
