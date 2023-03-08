![frame_generic_light](https://user-images.githubusercontent.com/80129996/159027714-e39b9f92-9e31-4113-844b-81e861c3b41b.png)

# Wavedash

Wavedash is a full stack chat app built with MERN.

## Live deployment

https://wavedash.onrender.com/

## Features

- Real-time messaging: Sending messages does not require a refresh by the recipient user
- Real-time notifications: When not focused on a chat that gets sent a message, the recipient user gets a notification
- Real-time typing indicators: A typing animation appears when another user is typing in a chat
- Fully functional authorization process: Both registration and login maintain account security 
- Search users: Search through the list of all users to start new chats
- Profile viewing: View personal or other uses' profiles, including name, email, and profile picture
- Latest message: Chats list shows the latest message and its sender
- Group chat functionality: Can create group chats with 3 or more users, rename group chats, and add/remove users provided the user has admin status

## Technologies

- MongoDB for the database
- Express for the backend web framework
- React for the responsive frontend
- Node JS for the web server
- Socket.io for real-time functions
- Chakra UI for frontend design
- bcrypt for password encryption
- jsonwebtoken for authorization
- Cloudinary for uploading images
- Lottie for the typing indicator animation
- dotenv for loading variables from .env
- mongoose for interacting with the MongoDB database
- express-async-handler for managing express routes and passing them to error handlers
- nodemon for live backend development
- Render for hosting
- Various other Node dependencies