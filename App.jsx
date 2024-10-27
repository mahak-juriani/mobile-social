import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, Button, Image } from 'react-native';
import axios from 'axios';
import Fuse from 'fuse.js';
import SearchBar from './components/SearchBar.js';
import PostList from './components/PostList.js';
import UserDetailsModal from './components/UserDetailsModal.js';
import SearchModal from './components/SearchModal.js';

const App = () => {
  const [posts, setPosts] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userPosts, setUserPosts] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchModalVisible, setSearchModalVisible] = React.useState(false);

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
    setSearchModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        searchUsers={searchUsers}
        clearSearch={clearSearch}
        setSearchModalVisible={setSearchModalVisible}
      />

      {/* Search Modal */}
      {showDropdown && searchQuery.length > 0 && (
        <SearchModal
          searchModalVisible={showDropdown}
          searchQuery={searchQuery}
          searchUsers={searchUsers}
          clearSearch={clearSearch}
          filteredUsers={filteredUsers}
          handleUserSelect={handleUserSelect}
          setSearchModalVisible={setShowDropdown}
        />
      )}

      {/* Posts List */}
      <PostList posts={posts} handleUserSelect={handleUserSelect} />

      {/* User Details Modal */}
      <UserDetailsModal
        modalVisible={modalVisible}
        selectedUser={selectedUser}
        userPosts={userPosts}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
});

export default App;