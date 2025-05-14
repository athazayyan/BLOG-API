import express from 'express';
import {
  getPosts,
  getPostById,
  getPostByTitle,
  createPost,
  updatePost,
  deletePost
} from '../db/blog';

const router = express.Router();

// GET /api/posts - Ambil semua post
router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET //id/:id - Ambil post berdasarkan ID
router.get('/id/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET //title/:title - Ambil post berdasarkan judul
router.get('/title/:title', async (req, res) => {
  try {
    const post = await getPostByTitle(req.params.title);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// POST / - Tambah post baru
router.post('/', async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT //:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const updated = await updatePost(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE //:id - Hapus post
router.delete('/:id', async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
