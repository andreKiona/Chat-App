import User from "../models/user.model.js";
import Message from "../models/message.mode.js";
import cloudinary from "../lib/cloudinary.js";

//get all users for sidebar
export const getUsersSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id; // Get the logged-in user's ID from the request object
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }) // Find all users except the logged-in user
      .select("-password"); // Exclude password and version fields from the result
    //   .sort({ createdAt: -1 }); // Sort users by creation date in descending order
    res.status(200).json(filteredUsers); // Send the filtered users as a response
  } catch (error) {
    console.error("Error fetching users for sidebar:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Send a 500 status code with an error message
  }
};

//get all messages between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params.id;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    }); // Sort messages by creation date in ascending order

    res.status(200).json(messages); // Send the messages as a response
  } catch (error) {
    console.error("Error fetching messages:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Send a 500 status code with an error message
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body; // Extract text and image from the request body
    const { id: receiverId } = req.params; // Extract receiver ID from the request parameters
    const senderId = req.user._id; // Get the sender ID from the request object

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
    }
    const newMessage = await Message.create({
      receiverId,
      senderId,
      text,
      image: imageUrl,
    }); // Create a new message with the provided data
    await newMessage.save(); // Save the new message to the database

    //Todo: real time functionality with socket.io

      res.status(200).json(newMessage); // Send the saved message as a response
      
  } catch (error) {
    console.error("Error sending message:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Send a 500 status code with an error message
  }
};
