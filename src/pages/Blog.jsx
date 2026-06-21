import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialBlogPosts } from "@/data/blog";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const localPosts = JSON.parse(
      localStorage.getItem("sukoonBlogPosts") || "[]",
    );
    const combinedPosts = [...initialBlogPosts, ...localPosts].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    setAllPosts(combinedPosts);
  }, []);

  const categories = [
    "All",
    "Stress",
    "Anxiety",
    "Mindfulness",
    "Lifestyle Balance",
  ];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || post === featuredPost,
  );

  return (
    <>
      <Helmet>
        <title>Blog - Sukoon World | Mental Wellness Insights & Tips</title>
        <meta
          name="description"
          content="Explore our blog for expert insights on stress management, anxiety relief, mindfulness practices, and lifestyle balance. Professional mental wellness guidance and tips."
        />
        <meta
          property="og:title"
          content="Blog - Sukoon World | Mental Wellness Insights & Tips"
        />
        <meta
          property="og:description"
          content="Explore our blog for expert insights on stress management, anxiety relief, mindfulness practices, and lifestyle balance. Professional mental wellness guidance and tips."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
              Mental Wellness Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, practical tips, and guidance for your mental
              wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Featured Article
                  </span>
                  <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 rounded-full"
                  >
                    <Link to={`/blog/${featuredPost.id}`}>
                      Read Full Article <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <img
                    alt="Featured blog post about breathing techniques and mindfulness"
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                    src={featuredPost.image}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No articles found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                variant="outline"
                className="mt-4 rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <img
                    alt={`Blog post about ${post.title}`}
                    className="w-full h-48 object-cover"
                    src={post.image}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3 w-fit">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-poppins font-semibold text-secondary mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80"
                      >
                        <Link to={`/blog/${post.id}`}>
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest mental wellness
              insights and tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90 rounded-full">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;
