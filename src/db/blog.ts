import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    author: { type: String, required: true },
    kategori: {
      type: String,
      enum: ['Shitpost USK', 'Informasi USK', 'Hiburan', 'Lain-lain'],
      default: 'Shitpost USK'
    },
    fakultas: {
      type: String,
      enum: [
        'Umum', // Untuk Sekolah Pascasarjana dan postingan umum
        'Ekonomi dan Bisnis (FEB)',
        'Hukum (FH)',
        'Keguruan dan Ilmu Pendidikan (FKIP)',
        'Teknik (FT)',
        'Kedokteran (FK)',
        'Pertanian (FP)',
        'Matematika dan Ilmu Pengetahuan Alam (FMIPA)',
        'Kedokteran Hewan (FKH)',
        'Kelautan dan Perikanan (FKP)',
        'Ilmu Sosial dan Ilmu Politik (FISIP)',
        'Keperawatan (FKep)',
        'Kedokteran Gigi (FKG)',
        'Ilmu Kelautan (FIK)',
        'Psikologi (FPsi)',
        'Ilmu Budaya (FIB)',
      ],
      default: 'Umum' // Default untuk Sekolah Pascasarjana dan umum
    },
  },
  { timestamps: true }
);

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
