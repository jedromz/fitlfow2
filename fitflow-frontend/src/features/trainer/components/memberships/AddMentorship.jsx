import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {axios} from '../../../../lib/axios';
import { useParams } from 'react-router-dom';

const fetchTrainees = async (trainerId) => {
  const { data } = await axios.get(`/trainers/${trainerId}/trainees`);
  return data;
};

const postMentorship = async (mentorship) => {
  const { data } = await axios.post('/mentorships', mentorship);
  return data;
};

const AddMentorship = () => {
  const { trainerId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [traineeId, setTraineeId] = useState("");

  const { data: trainees, isLoading, error } = useQuery(['trainees', trainerId], () => fetchTrainees(trainerId));
  const mentorshipMutation = useMutation(postMentorship);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMentorship = { startDate, endDate, price, traineeId, trainerId };
    mentorshipMutation.mutate(newMentorship);
    setStartDate("");
    setEndDate("");
    setPrice("");
    setTraineeId("");
  };

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Trainee</label>
        <select value={traineeId} onChange={e => setTraineeId(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          <option value="">Select a trainee</option>
          {trainees.map(trainee => (
            <option key={trainee.id} value={trainee.id}>{trainee.firstName} {trainee.lastName}</option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Mentorship
        </button>
      </div>
    </form>
  );
};

export default AddMentorship;
