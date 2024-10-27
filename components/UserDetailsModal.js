import React from 'react';
import { View, Text, Image, FlatList, Modal, Button, StyleSheet } from 'react-native';

const UserDetailsModal = ({ modalVisible, selectedUser, userPosts, setModalVisible }) => (
  <Modal
    visible={modalVisible}
    animationType="slide"
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContent}>
      {selectedUser && (
        <View style={styles.userDetailsContainer}>
          <Image source={{ uri: selectedUser.userAvatar }} style={styles.modalUserAvatar} />
          <Text style={styles.modalUserName}>{selectedUser.name}</Text>
          <Text style={styles.modalUserEmail}>Email: {selectedUser.email}</Text>
          <Text style={styles.modalUserPhone}>Phone: {selectedUser.phone}</Text>
          <Text style={styles.modalUserWebsite}>Website: {selectedUser.website}</Text>
        </View>
      )}
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userPostCard}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
          </View>
        )}
        style={{ paddingBottom: 20 }}
      />
      <Button title="Close" onPress={() => setModalVisible(false)} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  userDetailsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalUserAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  modalUserName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalUserEmail: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalUserPhone: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalUserWebsite: {
    fontSize: 16,
    marginBottom: 16,
  },
  userPostCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    color: '#333',
  },
});

export default UserDetailsModal;
