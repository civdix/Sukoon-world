import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Mindfulness",
    excerpt: "",
    content: "",
    author: "",
    readTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: `post-${uuidv4()}`,
      ...formData,
      date: new Date().toISOString().split("T")[0],
      featured: false,
      image: "https://images.unsplash.com/photo-1648827273919-511d8e3ca580", // Default image for new posts
    };

    const existingPosts = JSON.parse(
      localStorage.getItem("sukoonBlogPosts") || "[]",
    );
    existingPosts.push(newPost);
    localStorage.setItem("sukoonBlogPosts", JSON.stringify(existingPosts));

    toast({
      title: "Post Created Successfully! 🎉",
      description: "Your new blog post has been added.",
    });

    navigate("/blog");
  };

  const categories = ["Stress", "Anxiety", "Mindfulness", "Lifestyle Balance"];

  return (
    <>
      <Helmet>
        <title>Create New Blog Post - Sukoon World</title>
        <meta
          name="description"
          content="Create a new blog post for Sukoon World."
        />
      </Helmet>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
              Create a New Blog Post
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your insights and guidance with our community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Enter the post title"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={3}
                  placeholder="A short summary of the post..."
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  value={formData.content}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={10}
                  placeholder="Write the full blog post content here. You can use HTML for formatting."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    type="text"
                    required
                    value={formData.author}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="e.g., Dr. Sarah Ahmed"
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time *</Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    type="text"
                    required
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 rounded-full text-lg py-3"
                >
                  Create Post
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
