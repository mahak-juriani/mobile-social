import React from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Modal, Button, StyleSheet } from 'react-native';

const SearchModal = ({ searchModalVisible, searchQuery, searchUsers, clearSearch, filteredUsers, handleUserSelect, setSearchModalVisible }) => (
  <Modal
    visible={searchModalVisible}
    animationType="slide"
    onRequestClose={() => setSearchModalVisible(false)}
  >
    <View style={styles.fullScreenSearchContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={searchUsers}
          autoFocus={true}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.fullScreenUserContainer} onPress={() => handleUserSelect(item.id)}>
              <Text style={styles.fullScreenUserName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No users match your search</Text>
        </View>
      )}
      <Button title="Close" onPress={() => setSearchModalVisible(false)} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  fullScreenSearchContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#007aff',
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: '#777',
  },
  fullScreenUserContainer: {
    padding: 16,
    backgroundColor: '#e1f5fe',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreenUserName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchModal;
