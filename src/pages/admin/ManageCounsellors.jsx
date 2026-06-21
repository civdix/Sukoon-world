import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

const ManageCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCounsellor, setCurrentCounsellor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    qualifications: '',
    specialties: '',
    bio: '',
    longBio: '',
    image: '',
  });

  useEffect(() => {
    const storedCounsellors = JSON.parse(localStorage.getItem('sukoonCounsellors') || '[]');
    setCounsellors(storedCounsellors);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const counsellorData = {
      ...formData,
      id: isEditing ? currentCounsellor.id : `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().slice(0,4)}`,
      specialties: formData.specialties.split(',').map(s => s.trim()),
      image: formData.image || 'https://images.unsplash.com/photo-1580894732444-84cf4b65a1b3?q=80&w=800',
    };

    let updatedCounsellors;
    if (isEditing) {
      updatedCounsellors = counsellors.map(c => c.id === currentCounsellor.id ? counsellorData : c);
    } else {
      updatedCounsellors = [...counsellors, counsellorData];
    }

    localStorage.setItem('sukoonCounsellors', JSON.stringify(updatedCounsellors));
    setCounsellors(updatedCounsellors);
    resetForm();
    toast({ title: `Counsellor ${isEditing ? 'Updated' : 'Added'} Successfully!` });
  };

  const handleEdit = (counsellor) => {
    setIsEditing(true);
    setCurrentCounsellor(counsellor);
    setFormData({
      ...counsellor,
      specialties: counsellor.specialties.join(', '),
    });
  };

  const handleDelete = (id) => {
    const updatedCounsellors = counsellors.filter(c => c.id !== id);
    localStorage.setItem('sukoonCounsellors', JSON.stringify(updatedCounsellors));
    setCounsellors(updatedCounsellors);
    toast({ title: 'Counsellor Deleted', variant: 'destructive' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentCounsellor(null);
    setFormData({ name: '', qualifications: '', specialties: '', bio: '', longBio: '', image: '' });
  };

  return (
    <>
      <Helmet>
        <title>Manage Counsellors - Sukoon World</title>
      </Helmet>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">Manage Counsellors</h1>
            <p className="text-xl text-gray-600">Add, edit, or remove counsellor profiles.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-8 h-fit">
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-6">{isEditing ? 'Edit Counsellor' : 'Add New Counsellor'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div><Label htmlFor="name">Name</Label><Input id="name" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                <div><Label htmlFor="qualifications">Qualifications</Label><Input id="qualifications" name="qualifications" value={formData.qualifications} onChange={handleInputChange} required /></div>
                <div><Label htmlFor="specialties">Specialties (comma-separated)</Label><Input id="specialties" name="specialties" value={formData.specialties} onChange={handleInputChange} required /></div>
                <div><Label htmlFor="bio">Short Bio</Label><Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} required /></div>
                <div><Label htmlFor="longBio">Full Bio</Label><Textarea id="longBio" name="longBio" value={formData.longBio} onChange={handleInputChange} rows={5} required /></div>
                <div><Label htmlFor="image">Image URL</Label><Input id="image" name="image" value={formData.image} onChange={handleInputChange} placeholder="Leave blank for default" /></div>
                <div className="flex space-x-4 pt-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-full">{isEditing ? 'Update' : 'Add'}</Button>
                  {isEditing && <Button variant="outline" className="w-full rounded-full" onClick={resetForm}>Cancel</Button>}
                </div>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-2">
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-6">Current Counsellors (Custom)</h2>
              <div className="space-y-4">
                {counsellors.length > 0 ? counsellors.map(c => (
                  <div key={c.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={c.image} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-secondary">{c.name}</p>
                        <p className="text-sm text-gray-500">{c.qualifications}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </div>
                )) : <p className="text-gray-500 text-center py-8">No custom counsellors added yet.</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageCounsellors;