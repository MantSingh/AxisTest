import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {setMessageInRedux} from '../../redux/actions/home';

const ChatScreen = () => {
  const {noOfUsers, usersArray, selectedUser, messages} = useSelector(
    state => state.home,
  );

  const [message, setMessage] = useState('');
  const [isEdititngMsg, setIsEdititngMsg] = useState(false);
  const [selectedMsg, setselectedMsg] = useState({});
  const [isReplyFLow, setIsReplyFLow] = useState(false);
  const textInputRef = useRef();
  const OnPressReplySend = () => {
    if (!!message.trim()) {
      const indexToUpdate = messages.findIndex(
        item => item.id === selectedMsg.id,
      );
      let demoMsg = messages;
      if (indexToUpdate !== -1) {
        let reply = {
          id: Math.floor(1000000 + Math.random() * 1000000),
          reply: message,
          user: selectedUser,
        };
        if (demoMsg[indexToUpdate].reply != undefined) {
          demoMsg[indexToUpdate].reply = [
            ...demoMsg[indexToUpdate].reply,
            reply,
          ];
        } else {
          demoMsg[indexToUpdate].reply = [reply];
        }
      }
      setMessageInRedux(demoMsg);
      setIsReplyFLow(false);
      setMessage('');
    }
  };
  const onPressSend = () => {
    if (!!message.trim()) {
      var json = {
        user: selectedUser,
        message: message,
        id: Math.floor(1000000 + Math.random() * 1000000),
      };
      if (messages === undefined) {
        setMessageInRedux([json]);
      } else {
        setMessageInRedux([...messages, json]);
      }
      setMessage('');
    }
  };
  const deleteMessage = item => {
    var idToRemove = item.id;
    var updatedData = messages.filter(item => item.id !== idToRemove);
    setMessageInRedux(updatedData);
  };
  const editMsg = item => {
    setIsEdititngMsg(true);
    setMessage(item.message);
    textInputRef?.current?.focus();
    setselectedMsg(item);
  };
  const longPressMsg = item => {
    setselectedMsg(item);
    if (selectedUser?.id !== item?.user.id) {
      Alert.alert(
        `${selectedUser.userName}`,
        'Do you want to reply ? ',
        [
          {
            text: 'Reply',
            onPress: () => setIsReplyFLow(true),
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert(
        `${selectedUser.userName}`,
        'Please select action for selected message ',
        [
          {
            text: 'Reply',
            onPress: () => setIsReplyFLow(true),
          },
          {
            text: 'Delete',
            onPress: () => deleteMessage(item),
          },
          {text: 'Edit', onPress: () => editMsg(item)},
        ],
        {cancelable: true},
      );
    }
  };
  const onPressEdit = () => {
    const indexToUpdate = messages.findIndex(
      item => item.id === selectedMsg.id,
    );
    let demoMsg = messages;
    // Update the message if the index is found
    if (indexToUpdate !== -1) {
      demoMsg[indexToUpdate].message = message; // Replace with your new message
    }
    setMessageInRedux(demoMsg);
    setIsEdititngMsg(false);
    setMessage('');
  };
  const onPressActionBtn = () => {
    if (isEdititngMsg) {
      if (isReplyFLow) {
        onPressReplyEdit();
      } else {
        onPressEdit();
      }
    } else {
      if (isReplyFLow) {
        OnPressReplySend();
      } else {
        onPressSend();
      }
    }
  };
  const onPressReplyEdit = () => {
    const replyIdToEdit = selectedMsg?.id;
    let data = messages;
    data.forEach(item => {
      if (!!item?.reply) {
        item.reply.forEach(reply => {
          if (reply.id === replyIdToEdit) {
            reply.reply = message;
          }
        });
      }
    });
    setMessageInRedux(data);
    setIsEdititngMsg(false);
    setMessage('');
    setIsReplyFLow(false);
  };
  const longPressReply = item => {
    setselectedMsg(item);

    if (selectedUser?.id == item?.user.id) {
      Alert.alert(
        `${selectedUser.userName}`,
        'Please select action for selected Reply ',
        [
          {
            text: 'Delete',
            onPress: () => deleteReply(item),
          },
          {text: 'Edit', onPress: () => editReply(item)},
        ],
        {cancelable: true},
      );
    }
  };
  const deleteReply = i => {
    const replyIdToRemove = i?.id;
    let arr = messages;
    arr.forEach(item => {
      if (!!item.reply) {
        item.reply = item.reply.filter(reply => reply.id !== replyIdToRemove);
      }
    });
    setMessageInRedux(arr);
  };
  const editReply = i => {
    setIsEdititngMsg(true);
    setIsReplyFLow(true);
    setMessage(i.reply);
    textInputRef?.current?.focus();
  };

  return (
    <View style={styles.flex1}>
      <Text style={styles.title}>Chat Screen</Text>
      <View style={styles.flex1}>
        <FlatList
          data={messages}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity onLongPress={() => longPressMsg(item)}>
                  <Text style={styles.userName}>
                    {item?.user?.userName} :{' '}
                    <Text style={styles.messageText}>{item?.message}</Text>
                  </Text>
                </TouchableOpacity>

                {!!item?.reply &&
                  item?.reply.map(i => {
                    return (
                      <TouchableOpacity
                        style={styles.replyView}
                        onLongPress={() => longPressReply(i)}>
                        <Text style={styles.replyUserName}>
                          {i?.user?.userName} :{' '}
                          <Text style={styles.replyMessageText}>
                            {i?.reply}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </>
            );
          }}
        />

        <View style={styles.inputView}>
          <TextInput
            value={message}
            ref={textInputRef}
            onChangeText={setMessage}
            placeholder={`${selectedUser.userName} Enter  ${
              isReplyFLow ? 'Reply' : 'Message'
            }... `}
            style={styles.textInput}
          />
          <Text style={styles.sendBtn} onPress={onPressActionBtn}>
            {isEdititngMsg ? 'EDIT' : 'SEND'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
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
    width: '70%',
  },
  inputView: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  sendBtn: {
    fontSize: 24,
    color: 'blue',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  userName: {
    fontSize: 20,
    color: 'blue',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  replyUserName: {
    fontSize: 16,
    color: 'green',
  },
  replyMessageText: {
    fontSize: 12,
    color: 'black',
  },
  replyView: {
    marginLeft: 18,
  },
});
