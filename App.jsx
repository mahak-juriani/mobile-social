// Import necessary modules
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, Button, Image, Dimensions } from 'react-native';
import axios from 'axios';
import Fuse from 'fuse.js';

const App = () => {
  const [posts, setPosts] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userPosts, setUserPosts] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Fuse.js options for fuzzy search
  const fuse = new Fuse(users, {
    keys: ['name'],
    threshold: 0.3,
  });

  // Helper function to generate random dates between two years ago and today
  const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 2);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  // Fetching data from JSONPlaceholder API
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const postsWithUsers = postsResponse.data.map(post => {
          const user = usersResponse.data.find(user => user.id === post.userId);
          const createdDate = getRandomDate();
          const userAvatar = `https://robohash.org/${user.id}?set=set4`; // Random avatar from an open-source API
          return { ...post, userName: user ? user.name : 'Unknown User', createdDate, userAvatar };
        });
        postsWithUsers.sort((a, b) => b.createdDate - a.createdDate);
        setPosts(postsWithUsers);
        setUsers(usersResponse.data.map(user => ({ ...user, userAvatar: `https://robohash.org/${user.id}?set=set4` })));
        setFilteredUsers(usersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  // Search users based on search query
  const searchUsers = (query) => {
    setSearchQuery(query);
    if (query) {
      const result = fuse.search(query).map(({ item }) => item);
      setFilteredUsers(result);
      setShowDropdown(true);
    } else {
      setFilteredUsers(users);
      setShowDropdown(false);
    }
  };

  // Handle user selection and fetch their posts
  const handleUserSelect = async (userId) => {
    try {
      const user = users.find(user => user.id === userId);
      setSelectedUser(user);
      const userPostsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      setUserPosts(userPostsResponse.data);
      setModalVisible(true);
      setShowDropdown(false);
      setSearchQuery('');
    } catch (error) {
      console.error(error);
    }
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredUsers(users);
    setShowDropdown(false);
  };

  // Rendering each post item
  const renderPostItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => handleUserSelect(item.userId)} style={styles.userInfoContainer}>
          <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
          <Text style={styles.userName}>{item.userName}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.postBody}>{item.body}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.likeButton}></TouchableOpacity>
        <Text style={styles.postDate}>{item.createdDate.toLocaleDateString()}</Text>
      </View>
    </View>
  );

  // Rendering each user item for search dropdown
  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.fullScreenUserContainer} onPress={() => handleUserSelect(item.id)}>
      <Image source={{ uri: item.userAvatar }} style={styles.fullScreenUserAvatar} />
      <Text style={styles.fullScreenUserName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={searchUsers}
          onFocus={() => setShowDropdown(true)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* User Search Results */}
      {showDropdown && searchQuery.length > 0 && (
        <View style={styles.dropdownContainer}>
          {filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderUserItem}
              style={styles.dropdownList}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No users match your search</Text>
            </View>
          )}
        </View>
      )}

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        style={{ marginBottom: 16 }}
      />

      {/* User Details Modal */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
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
  dropdownContainer: {
    maxHeight: 300,
    marginBottom: 16,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  fullScreenUserAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  fullScreenUserName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#777',
  },
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
});

export default App;
