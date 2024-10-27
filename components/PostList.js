import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const PostList = ({ posts, handleUserSelect }) => (
  <FlatList
    data={posts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
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
    )}
    style={{ marginBottom: 16 }}
  />
);

const styles = StyleSheet.create({
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
});

export default PostList;
