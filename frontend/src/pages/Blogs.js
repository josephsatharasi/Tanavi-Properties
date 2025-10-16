import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Our Blogs</h1>
        <p className="text-center text-gray-600 mb-12">Insights and updates from the real estate world</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">{blog.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
