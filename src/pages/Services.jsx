import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Users, Shield, Clock, CheckCircle } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const handleBooking = (serviceId) => {
    navigate(`/book?service=${serviceId}`);
  };

  const services = [
    {
      id: 'discovery',
      title: 'Discovery Call',
      duration: '30 minutes',
      price: 'Free',
      icon: Heart,
      description: 'A complimentary consultation to understand your needs and determine the best approach for your mental wellness journey.',
      features: [
        'Initial assessment of your concerns',
        'Discussion of your goals and expectations',
        'Overview of our services and approach',
        'Personalized recommendations',
        'No commitment required'
      ],
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'counselling',
      title: '60-Minute Counselling Session',
      duration: '60 minutes',
      price: '₹399',
      icon: Users,
      description: 'Professional one-on-one counselling sessions with our licensed therapists to address your specific mental health concerns.',
      features: [
        'Individual therapy session',
        'Evidence-based therapeutic approaches',
        'Personalized treatment planning',
        'Progress tracking and feedback',
        'Flexible scheduling options'
      ],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'stress',
      title: 'Stress Management',
      duration: '45 minutes',
      price: '₹299',
      icon: Shield,
      description: 'Learn effective techniques and strategies to manage daily stress and build resilience for long-term mental wellness.',
      features: [
        'Stress assessment and identification',
        'Coping strategies and techniques',
        'Relaxation and breathing exercises',
        'Lifestyle modification guidance',
        'Ongoing support and resources'
      ],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Coaching',
      duration: '45 minutes',
      price: '₹249',
      icon: Clock,
      description: 'Develop mindfulness practices and meditation techniques to cultivate inner peace and present-moment awareness.',
      features: [
        'Introduction to mindfulness principles',
        'Guided meditation sessions',
        'Daily mindfulness practices',
        'Stress reduction techniques',
        'Personal mindfulness plan'
      ],
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 'relationship',
      title: 'Relationship Counselling',
      duration: '60 minutes',
      price: '₹499',
      icon: Users,
      description: 'Work through relationship challenges and build healthy, lasting connections with expert guidance.',
      features: [
        'Couples and relationship support',
        'Effective communication exercises',
        'Conflict resolution tools',
        'Rebuilding trust and intimacy',
        'Safe and neutral environment'
      ],
      color: 'bg-pink-50 border-pink-200'
    },
    {
      id: 'anxiety',
      title: 'Anxiety Management',
      duration: '45 minutes',
      price: '₹299',
      icon: Shield,
      description: 'Develop personalized strategies to manage anxiety, overcome fear, and regain peace of mind.',
      features: [
        'Identify anxiety triggers',
        'Cognitive reframing techniques',
        'Somatic calming exercises',
        'Fear desensitization planning',
        'Daily relaxation routines'
      ],
      color: 'bg-amber-50 border-amber-200'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - Sukoon World | Professional Counselling & Stress Relief</title>
        <meta name="description" content="Explore our comprehensive mental wellness services including free discovery calls, counselling sessions, stress management, and mindfulness coaching. Book your session today." />
        <meta property="og:title" content="Our Services - Sukoon World | Professional Counselling & Stress Relief" />
        <meta property="og:description" content="Explore our comprehensive mental wellness services including free discovery calls, counselling sessions, stress management, and mindfulness coaching. Book your session today." />
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
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mental wellness support tailored to your unique needs and journey towards inner peace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${service.color} p-8 rounded-2xl border-2 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <service.icon className="h-12 w-12 text-primary" />
                    <div>
                      <h3 className="text-2xl font-poppins font-bold text-secondary">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">
                        {service.duration} • {service.price}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  {service.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-poppins font-semibold text-secondary mb-4">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleBooking(service.id)}
                    className="bg-primary hover:bg-primary/90 rounded-full flex-1"
                  >
                    Book This Service
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-primary text-primary bg-transparent hover:bg-primary hover:text-white">
                    <Link to="/contact">Ask Questions</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with your mental wellness journey is simple and straightforward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Service',
                description: 'Select the service that best fits your needs and goals.'
              },
              {
                step: '2',
                title: 'Book Your Session',
                description: 'Schedule a convenient time that works with your schedule.'
              },
              {
                step: '3',
                title: 'Complete Intake Form',
                description: 'Fill out a brief form to help us understand your needs.'
              },
              {
                step: '4',
                title: 'Start Your Journey',
                description: 'Meet with your counsellor and begin your path to wellness.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-poppins font-semibold text-secondary mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Take the first step towards better mental wellness. Book your free discovery call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full text-lg px-8 py-3">
                <Link to="/book">Book Free Discovery Call</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 py-3 border-white text-white bg-transparent hover:bg-white hover:text-primary">
                <Link to="/contact">Have Questions?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;