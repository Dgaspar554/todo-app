import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL + '/tasks');
      setTasks(response.data);
    } catch (err) {
      Alert.alert('Error', 'No se pudieron obtener las tareas');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(API_URL + '/tasks', {
        title,
        description: '',
        isDone: false,
      });
      setTitle('');
      fetchTasks();
    } catch (err) {
      Alert.alert('Error', 'No se pudo agregar la tarea');
    }
  };

  const toggleDone = async task => {
    try {
      await axios.put(`${API_URL + '/tasks'}/${task.id}`, {
        ...task,
        isDone: !task.isDone,
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  const deleteTask = async id => {
    try {
      await axios.delete(`${API_URL + '/tasks'}/${id}`);
      fetchTasks();
    } catch (err) {
      Alert.alert('Error', 'No se pudo eliminar la tarea');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.task}>
      <Text style={[styles.taskText, item.isDone && styles.done]}>
        {item.title}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.completeButton]}
          onPress={() => toggleDone(item)}>
          <Text style={styles.buttonText}>
            {item.isDone ? 'Desmarcar' : 'Completar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteTask(item.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  task: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  completeButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
