import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, searchUsers, clearSearch, setSearchModalVisible }) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      style={styles.searchBar}
      placeholder="Search users..."
      value={searchQuery}
      onChangeText={searchUsers}
      onFocus={() => setSearchModalVisible(true)}
      autoFocus={true}
      animated
    />
    
    {searchQuery.length > 0 && (
      <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>X</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
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
});

export default SearchBar;
