import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { initialCounsellors } from '@/data/counsellors';

const About = () => {
  const featuredCounsellors = initialCounsellors.filter(c => c.featured).slice(0, 3);

  return <>
      <Helmet>
        <title>About Us - Sukoon World | Professional Online Counselling Team</title>
        <meta name="description" content="Meet our certified counsellors and learn about our mission to provide safe, confidential mental wellness support. Discover our commitment to your peace and well-being." />
        <meta property="og:title" content="About Us - Sukoon World | Professional Online Counselling Team" />
        <meta property="og:description" content="Meet our certified counsellors and learn about our mission to provide safe, confidential mental wellness support. Discover our commitment to your peace and well-being." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">About Sukoon World</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Creating a safe, confidential space where peace finds you through professional mental wellness support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }}>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">At Sukoon World, we believe everyone deserves a safe space to heal, grow, and find inner peace. Our mission is to provide accessible, professional mental wellness support that respects your privacy and honors your journey.</p>
              <p className="text-lg text-gray-600 mb-6">
                We understand that seeking help takes courage, and we're here to support you every step of the way with compassion, expertise, and complete confidentiality.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <span className="font-poppins font-semibold text-secondary">100% Confidential</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-primary" />
                  <span className="font-poppins font-semibold text-secondary">Licensed Professionals</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }}>
              <img alt="Peaceful counselling session environment" className="w-full h-96 object-cover rounded-2xl shadow-lg" src="https://horizons-cdn.hostinger.com/1a2fb3d2-1219-4a66-9589-2aa950922210/24404-j774c.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Counsellors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Meet Our Featured Counsellors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of licensed professionals brings years of experience and specialized training to support your mental wellness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCounsellors.map((counsellor, index) => <motion.div key={counsellor.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="bg-white p-8 rounded-2xl shadow-lg text-center flex flex-col">
                <img alt={`Professional headshot of ${counsellor.name}`} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" src={counsellor.image} />
                <h3 className="text-xl font-poppins font-semibold text-secondary mb-2">
                  {counsellor.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {counsellor.specialties[0]} & {counsellor.specialties[1]}
                </p>
                <p className="text-gray-600 mb-6 flex-grow">
                  {counsellor.bio}
                </p>
                <Button asChild variant="link" className="text-primary mt-auto">
                  <Link to={`/counsellors/${counsellor.id}`}>View Full Profile <ArrowRight className="h-4 w-4 ml-2" /></Link>
                </Button>
              </motion.div>)}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90">
              <Link to="/counsellors">Meet The Entire Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Confidentiality Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Your Privacy is Sacred
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the importance of confidentiality in your healing journey. Here's how we protect your privacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            icon: Shield,
            title: 'Encrypted Sessions',
            description: 'All online sessions use end-to-end encryption for maximum security.'
          }, {
            icon: Users,
            title: 'Professional Ethics',
            description: 'Our counsellors follow strict professional confidentiality guidelines.'
          }, {
            icon: Heart,
            title: 'Safe Space',
            description: 'Your thoughts and feelings are shared in a judgment-free environment.'
          }, {
            icon: Award,
            title: 'HIPAA Compliant',
            description: 'We meet all healthcare privacy and security standards.'
          }].map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-poppins font-semibold text-secondary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-6">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: 'Compassion',
            description: 'We approach every interaction with empathy, understanding, and genuine care for your well-being.'
          }, {
            title: 'Integrity',
            description: 'We maintain the highest ethical standards and honor our commitment to your privacy and trust.'
          }, {
            title: 'Excellence',
            description: 'We continuously strive to provide the best possible care through ongoing education and professional development.'
          }].map((value, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h3 className="text-xl font-poppins font-semibold text-secondary mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>
    </>;
};
export default About;