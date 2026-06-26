import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Clock, Star, ArrowRight } from "lucide-react";
import { initialBlogPosts } from "@/data/blog";

const Home = () => {
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 150], [1, 0.2]);
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const logoY = useTransform(scrollY, [0, 150], [0, -50]);

  const [showAllReviews, setShowAllReviews] = useState(false);

  const services = [
    {
      title: "Discovery Call",
      description: "Free 30-minute consultation to understand your needs",
      icon: Heart,
      price: "Free",
      id: "discovery",
    },
    {
      title: "Counselling Session",
      description: "Professional 60-minute one-on-one counselling",
      icon: Users,
      price: "Book Now",
      id: "counselling",
    },
    {
      title: "Stress Management",
      description: "Learn effective techniques to manage daily stress",
      icon: Shield,
      price: "Book Now",
      id: "stress",
    },
    {
      title: "Mindfulness Coaching",
      description: "Develop mindfulness practices for inner peace",
      icon: Clock,
      price: "Book Now",
      id: "mindfulness",
    },
    {
      title: "Relationship Counselling",
      description: "Work through challenges and build healthy connections",
      icon: Users,
      price: "Book Now",
      id: "relationship",
    },
    {
      title: "Anxiety Management",
      description: "Develop personalized strategies to regain peace of mind",
      icon: Shield,
      price: "Book Now",
      id: "anxiety",
    },
  ];

  const testimonials = [
    {
      name: "Anshu Singh Chauhan",
      text: "Booking a session on SukoonWorld was the best decision I've made. The discovery call made me so comfortable, and their anxiety management sessions have brought real sukoon to my daily life.",
      rating: 5,
      image: "/images/review1.webp",
    },
    {
      name: "Mohd Salmaan",
      text: "The professional counselling here is top-notch. I was struggling with work stress, but my therapist at SukoonWorld guided me with highly personalized, practical coping strategies.",
      rating: 5,
      image: "/images/review2.webp",
    },
    {
      name: "Sintu Kumar Sah",
      text: "I highly recommend SukoonWorld's mindfulness coaching. The sessions are extremely tailormade, giving me deep emotional resilience and absolute clarity.",
      rating: 5,
      image: "/images/review3.webp",
    },
    {
      name: "George Peterson",
      text: "As a visitor to India, seeking mental peace led me to SukoonWorld. I took beautiful blessings about Hindu Dharma and mindfulness, which deeply connected me to my inner self.",
      rating: 5,
      image: "/images/review4.webp",
    },
    {
      name: "Yumi Takahashi",
      text: "I learned about Buddhism and meditation from Rohit Kumar Tiwari, and about yoga from Rishikesh. SukoonWorld is a wonderful sanctuary for deep spiritual growth and meditation.",
      rating: 5,
      image: "/images/review5.webp",
    },
    {
      name: "Shriram Reddy",
      text: "SukoonWorld has completely transformed my outlook. The support is highly professional and the techniques are simple but life-changing. Grateful to the entire team.",
      rating: 5,
      image: "/images/review6.webp",
    },
  ];

  // Pick first 3 posts for homepage previews
  const blogPosts = initialBlogPosts.slice(0, 3);
  const reviewsToDisplay = showAllReviews ? testimonials : testimonials.slice(0, 4);

  return (
    <>
      <Helmet>
        <title>
          Sukoon World - Where Peace Finds You | Online Counselling & Stress
          Relief
        </title>
        <meta
          name="description"
          content="Professional online counselling and stress-relief sessions. Find peace, manage anxiety, and improve your mental wellness with our certified counsellors."
        />
        <meta
          property="og:title"
          content="Sukoon World - Where Peace Finds You | Online Counselling & Stress Relief"
        />
        <meta
          property="og:description"
          content="Professional online counselling and stress-relief sessions. Find peace, manage anxiety, and improve your mental wellness with our certified counsellors."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="relative z-10 w-full max-w-7xl overflow-hidden mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center -mt-16">
          <motion.div
            className="flex flex-col items-center justify-center w-full"
            style={{
              scale: logoScale,
              opacity: logoOpacity,
              y: logoY,
              transformOrigin: "top center",
            }}
          >
            <img
              src="/images/sukoonlogowhite.webp"
              alt="SukoonWorld Logo"
              style={{ paddingTop: '10px', paddingLeft: '10px' }}
              className="h-48 w-48 mx-auto rounded-full object-cover shadow-lg border border-gray-150/50 hover:scale-105 transition-transform duration-300 bg-white"
            />
            <h1 className="text-2xl md:text-4xl font-poppins font-bold text-secondary mt-4">
              Sukoon<span className="text-gradient">World</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6"
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-secondary mb-6">
              Where Peace <span className="text-gradient">Finds You</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional online counselling and stress-relief sessions in a
              safe, confidential space designed for your mental wellness
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full text-lg px-8 py-3"
              >
                <Link to="/book">Book a Session</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <img
            alt="Peaceful meditation scene with person in serene environment"
            className="w-full h-64 object-cover opacity-20"
            src="https://images.unsplash.com/photo-1581557568198-15aee95662e8"
          />
        </div>
      </section>

      {/* Why Sukoon Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Why Choose Sukoon?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a sanctuary for your mental wellness with professional
              care, complete confidentiality, and personalized support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Complete Confidentiality",
                description:
                  "Your privacy is our priority. All sessions are completely confidential and secure.",
              },
              {
                icon: Users,
                title: "Certified Counsellors",
                description:
                  "Work with experienced, licensed professionals who understand your journey.",
              },
              {
                icon: Heart,
                title: "Personalized Care",
                description:
                  "Tailored approaches that respect your unique needs and circumstances.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-poppins font-semibold text-secondary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Impact / Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100/50"
            >
              <h3 className="text-4xl font-extrabold text-primary mb-2">1000+</h3>
              <p className="text-lg font-poppins font-medium text-secondary">
                Hours of Spreading Sukoon
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Mindfulness & guided therapeutic support session hours delivered.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100/50"
            >
              <h3 className="text-4xl font-extrabold text-primary mb-2">300+</h3>
              <p className="text-lg font-poppins font-medium text-secondary">
                Happy Hearts & Minds
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Individuals who found their path to mental clarity and inner calm.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100/50"
            >
              <h3 className="text-4xl font-extrabold text-primary mb-2">50+</h3>
              <p className="text-lg font-poppins font-medium text-secondary">
                Trusted Partners & Clients
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Collaborative institutions and wellness networks supporting our mission.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mental wellness support tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <service.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-poppins font-semibold text-secondary mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link to={`/services`}>{service.price}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from people who found their peace with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewsToDisplay.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover shadow-md flex-shrink-0"
                />
                <div>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-2 italic text-sm">
                    "{testimonial.text}"
                  </p>
                  <p className="font-poppins font-semibold text-secondary text-sm">
                    {testimonial.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAllReviews(!showAllReviews)}
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              {showAllReviews ? "Show Less" : "Show More"}
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights and tips for your mental wellness journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  alt={`Blog post about ${post.title}`}
                  className="w-full h-48 object-cover"
                  src={post.image}
                />
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-poppins font-semibold text-secondary mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {post.readTime}
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
              Ready to Begin Your Journey to Peace?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Take the first step towards better mental wellness. Book your
              session today and discover where peace finds you.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 rounded-full text-lg px-8 py-3"
            >
              <Link to="/book">Book Your Session Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
