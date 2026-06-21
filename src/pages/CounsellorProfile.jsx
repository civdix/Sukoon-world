import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { initialCounsellors } from '@/data/counsellors';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, BookOpen } from 'lucide-react';

const CounsellorProfile = () => {
  const { counsellorId } = useParams();
  const [counsellor, setCounsellor] = useState(null);

  useEffect(() => {
    const localCounsellors = JSON.parse(localStorage.getItem('sukoonCounsellors') || '[]');
    const allCounsellors = [...initialCounsellors, ...localCounsellors];
    const foundCounsellor = allCounsellors.find(c => c.id === counsellorId);
    setCounsellor(foundCounsellor);
  }, [counsellorId]);

  if (!counsellor) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondary mb-4">Counsellor not found</h1>
          <p className="text-gray-600 mb-8">The profile you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/counsellors">Back to Our Team</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${counsellor.name} - Sukoon World`}</title>
        <meta name="description" content={counsellor.bio} />
        <meta property="og:title" content={`${counsellor.name} - Sukoon World`} />
        <meta property="og:description" content={counsellor.bio} />
        <meta property="og:image" content={counsellor.image} />
      </Helmet>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button asChild variant="ghost" className="mb-8 group">
              <Link to="/counsellors">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Our Team
              </Link>
            </Button>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                <div className="md:col-span-4">
                  <img src={counsellor.image} alt={`Profile of ${counsellor.name}`} className="w-full h-full object-cover min-h-[300px] md:min-h-full" />
                </div>
                <div className="md:col-span-8 p-8 md:p-12 flex flex-col">
                  <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-secondary mb-2">{counsellor.name}</h1>
                  <p className="text-primary font-medium mb-6">{counsellor.qualifications}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-poppins font-semibold text-secondary mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-3">
                      {counsellor.specialties.map(specialty => (
                        <div key={specialty} className="flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 flex-grow">
                    <h3 className="text-lg font-poppins font-semibold text-secondary mb-3">About Me</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{counsellor.longBio}</p>
                  </div>
                  
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-full mt-auto">
                    <Link to={`/book?counsellor=${counsellor.id}`}>
                      <BookOpen className="h-5 w-5 mr-3" />
                      Book a Session with {counsellor.name.split(' ')[1]}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CounsellorProfile;