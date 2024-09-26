import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {setSelectedUser} from '../../redux/actions/home';
import { useNavigation } from '@react-navigation/native';

const SelectUser = () => {
  const {noOfUsers, usersArray} = useSelector(state => state.home);
  const [selectedUserlocal, setSelectedUserlocal] = useState([]);
  const navigation = useNavigation()
  const onPressSubmit = () => {
    setSelectedUser(selectedUserlocal);
    navigation.navigate("ChatScreen")
  };
  return (
    <View>
      <Text style={styles.title}>Select User</Text>
      <FlatList
        data={usersArray}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[
                styles.touchContiner,
                selectedUserlocal.id == item.id && {backgroundColor: 'blue'},
              ]}
              onPress={() => {
                setSelectedUserlocal(item);
              }}>
              <Text
                style={[
                  styles.touchText,
                  selectedUserlocal.id == item.id && {color: 'white'},
                ]}>
                {item.userName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity style={styles.touchBtn} onPress={onPressSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUser;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    padding: 16,
    color: 'black',
  },
  touchContiner: {
    borderRadius: 8,
    height: 56,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  touchText: {
    color: 'black',
    fontSize: 24,
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
