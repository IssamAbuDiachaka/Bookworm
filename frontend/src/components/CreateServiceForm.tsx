import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

// The input data for creating a new service
interface ServiceInput {
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
}

const CreateServiceForm: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ServiceInput>();

  // Mutation to send the service data to the backend
  const createServiceMutation = useMutation({
    mutationFn: async (payload: ServiceInput) => {
      const res = await api.post('/services', payload);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate the 'services' query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['services'] });
      // Redirect to the services page or the provider's own services page
      navigate('/services');
      alert('Service created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create service:', error);
      alert('Error creating service. Please try again.');
    },
  });

  const onSubmit = (formData: ServiceInput) => {
    // The backend's createService controller expects the provider ID to be attached by middleware
    createServiceMutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Service</h2>
      <p className="text-gray-600 mb-6 text-center">Fill out the details for your service listing.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Service Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., Professional Plumbing"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description', { required: true })}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Provide a detailed description of your service."
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            id="category"
            type="text"
            {...register('category', { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., Plumbing, Electrical, Cleaning"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (in USD)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { required: true, valueAsNumber: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., 75.00"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            id="location"
            type="text"
            {...register('location', { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., Tamale, Northern Region, Ghana"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Creating...' : 'Create Service'}
        </button>
      </form>
    </div>
  );
};

export default CreateServiceForm;
