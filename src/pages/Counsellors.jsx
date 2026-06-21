import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { initialCounsellors } from "@/data/counsellors";
import { ArrowRight } from "lucide-react";

const CounsellorCard = ({ counsellor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative">
        <img
          src={counsellor.image}
          alt={`Professional headshot of ${counsellor.name}`}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-poppins font-bold text-white mb-1">
            {counsellor.name}
          </h3>
          <p className="text-accent/80 text-sm font-medium">
            {counsellor.qualifications}
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {counsellor.specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="bg-accent/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold"
            >
              {specialty}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed line-clamp-4">
          {counsellor.bio}
        </p>
        <div className="mt-auto space-y-3">
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 rounded-full font-semibold"
          >
            <Link to={`/book?counsellor=${counsellor.id}`}>Book a Session</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full text-primary group/link"
          >
            <Link to={`/counsellors/${counsellor.id}`}>
              View Full Profile
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Counsellors = () => {
  const [allCounsellors, setAllCounsellors] = useState([]);

  useEffect(() => {
    const localCounsellors = JSON.parse(
      localStorage.getItem("sukoonCounsellors") || "[]",
    );
    setAllCounsellors([...initialCounsellors, ...localCounsellors]);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Counsellors - Sukoon World | Meet Our Expert Team</title>
        <meta
          name="description"
          content="Meet the professional and compassionate counsellors at Sukoon World. Our certified experts specialize in stress, anxiety, mindfulness, and more."
        />
        <meta
          property="og:title"
          content="Our Counsellors - Sukoon World | Meet Our Expert Team"
        />
        <meta
          property="og:description"
          content="Meet the professional and compassionate counsellors at Sukoon World. Our certified experts specialize in stress, anxiety, mindfulness, and more."
        />
      </Helmet>

      <div className="bg-gray-50">
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-poppins font-extrabold text-secondary mb-4 tracking-tight">
                Meet Our Expert Team
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A dedicated group of certified professionals committed to your
                mental well-being and personal growth.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {allCounsellors.map((counsellor, index) => (
                <CounsellorCard
                  key={counsellor.id}
                  counsellor={counsellor}
                  index={index}
                />
              ))}
            </div>

            {/* Join the Team CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-20 text-center max-w-xl mx-auto p-8 rounded-3xl bg-primary/10 border border-primary/20"
            >
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-3">
                Want to be a part of our team?
              </h2>
              <p className="text-gray-600 mb-6">
                We are always looking for passionate, certified therapists and wellness professionals to join the Sukoon family.
              </p>
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-semibold px-8">
                <Link to="/contact?subject=join-team">Join Our Team</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Counsellors;
