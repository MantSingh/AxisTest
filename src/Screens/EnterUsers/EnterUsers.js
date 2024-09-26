import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {setNumberOfUsers, setUsersArray} from '../../redux/actions/home';
import {useNavigation} from '@react-navigation/native';

const EnterUsers = () => {
  const [noOfUsers, setNoOfUsers] = useState('');
  const navigation = useNavigation();

  const makeUsersArray = x => {
    return Array.from({length: x}, (_, index) => ({
      id: Math.floor(1000 + Math.random() * 1000),
      userName: `user${Math.floor(1000 + Math.random() * 1000)}`,
    }));
  };

  const onPressSubmit = () => {
    setNumberOfUsers(noOfUsers);
    let arr = makeUsersArray(noOfUsers);

    setUsersArray(arr);

    navigation.navigate('SelectUser');
  };
  return (
    <View>
      <Text style={styles.title}>Enter Users</Text>
      <TextInput
        value={noOfUsers}
        onChangeText={setNoOfUsers}
        placeholder="Enter Number of users ..."
        style={styles.textInput}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.touchBtn} onPress={onPressSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterUsers;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    padding: 16,
    color: 'black',
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    margin: 16,
  },
  touchBtn: {
    borderRadius: 8,
    height: 56,
    margin: 16,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 24,
  },
});
