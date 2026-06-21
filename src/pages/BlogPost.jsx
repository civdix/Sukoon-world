import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { initialBlogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const localPosts = JSON.parse(
      localStorage.getItem("sukoonBlogPosts") || "[]",
    );
    const allPosts = [...initialBlogPosts, ...localPosts];
    const foundPost = allPosts.find((p) => p.id === postId);
    setPost(foundPost);
  }, [postId]);

  const handleDelete = () => {
    let localPosts = JSON.parse(
      localStorage.getItem("sukoonBlogPosts") || "[]",
    );

    const isDeletable = localPosts.some((p) => p.id === postId);

    if (!isDeletable) {
      toast({
        title: "Deletion Failed",
        description: "This is a default post and cannot be deleted.",
        variant: "destructive",
      });
      return;
    }

    localPosts = localPosts.filter((p) => p.id !== postId);
    localStorage.setItem("sukoonBlogPosts", JSON.stringify(localPosts));

    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully deleted.",
    });

    navigate("/blog");
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondary mb-4">
            Post not found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isEditable = !initialBlogPosts.some((p) => p.id === postId);

  return (
    <>
      <Helmet>
        <title>{post.title} - Sukoon World Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta
          property="og:title"
          content={`${post.title} - Sukoon World Blog`}
        />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Button asChild variant="ghost" className="mb-4">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span>{post.readTime}</span>
              </div>
            </div>

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl mb-12 shadow-lg"
            />

            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {isEditable && (
              <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-end space-x-4">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this blog post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
