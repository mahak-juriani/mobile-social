# Social Media App

Welcome to the Social Media App! This is a simple social media prototype built using React Native. The app allows users to view posts, search for users, and see user details with a nice user interface. It's a great starting point if you're learning React Native or want to explore how social apps work.

## Features

- **User Posts Feed**: Browse through a list of posts made by various users. Each post displays the user's name, profile picture, and post content.

- **User Search**: Use the search bar to find users. The app includes a fuzzy search feature that helps find users even if the search term is slightly inaccurate.

- **User Details Modal**: Click on a user's name or profile picture to view more information about them, including their posts, email, and contact details.

- **Simple UI Animations**: The app includes some basic UI animations, such as focusing on the search bar when selected, to make the user experience smoother.

## How to Run the Project

Follow these steps to run the Social Media App on your local machine:

### Prerequisites

- **Node.js** and **npm**: Make sure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).


### Getting Started

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/social-media-app.git
   cd social-media-app
   ```

2. **Install Dependencies**
   Install the necessary dependencies by running:
   ```sh
   npm install
   ```

3. **Start the Project**

   If you are running on Android using React Native CLI:
   ```sh
   npx react-native run-android
   npx react-native start
   ```

## Project Structure

- **App.jsx**: The main entry point of the app. It manages the overall state and handles the different features like fetching data, searching, and showing user details.

- **components/**: Contains all the reusable components used throughout the app:
  - **SearchBar.js**: The search bar component that allows users to input their search queries.
  - **PostList.js**: Displays the list of posts.
  - **UserDetailsModal.js**: Shows detailed information about a selected user, including their recent posts.
  - **SearchModal.js**: Displays search results when a user types in the search bar.

## Technologies Used

- **React Native**: The framework used to build the app.
- **Expo**: Helps in setting up and running the app easily.
- **Axios**: For fetching data from the JSONPlaceholder API.
- **Fuse.js**: For implementing the fuzzy search functionality.

## APIs Used

This project uses **JSONPlaceholder** as a fake REST API to fetch posts and user data. It's a great tool for prototyping and testing without needing a real backend.

- **Posts API**: `https://jsonplaceholder.typicode.com/posts`
- **Users API**: `https://jsonplaceholder.typicode.com/users`

## Future Improvements

- **Like and Comment Functionality**: Currently, the "like" button is just a placeholder. Adding real functionality to like and comment on posts would enhance the app.
- **User Authentication**: Implementing user login and authentication to personalize the experience.
- **Improved Animations**: More fluid animations for opening modals and transitioning between screens.

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are always welcome, whether it's improving the UI, fixing bugs, or adding new features.


Thanks for checking out this project! I hope you enjoy exploring and learning from it as much as I did building it. If you have any questions or suggestions, feel free to reach out!

