import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true },
});

export const PostModel = mongoose.model("Post", PostSchema);

// Get all posts
export const getPosts = async () => {
  try {
    const posts = await PostModel.find();
    return posts;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
};

// Get post by ID
export const getPostById = async (id: string) => {
  try {
    const post = await PostModel.findById(id);
    if (!post) throw new Error("Post not found");
    return post;
  } catch (error) {
    throw new Error("Error fetching post");
  }
};

// Get post by title
export const getPostByTitle = async (title: string) => {
  return await PostModel.findOne({ title });
};

// Create a new post
export const createPost = async (postData: {
  title: string;
  content: string;
  image?: string;
  author: string;
}) => {
  const post = new PostModel(postData);
  return await post.save();
};

// Update a post
export const updatePost = async (
  id: string,
  postData: {
    title: string;
    content: string;
    image?: string;
    author: string;
  }
) => {
  return await PostModel.findByIdAndUpdate(id, postData, { new: true });
};

// Delete a post
export const deletePost = async (id: string) => {
  return await PostModel.findByIdAndDelete(id);
};
