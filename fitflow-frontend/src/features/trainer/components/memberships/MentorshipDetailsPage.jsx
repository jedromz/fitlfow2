import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../lib/axios';
import { useParams } from 'react-router-dom';

const getMentorship = async (mentorshipId) => {
  const { data } = await axios.get(`mentorships/${mentorshipId}`);
  return data;
}

const MentorshipDetailsPage = () => {
  const { mentorshipId } = useParams();

  const { isLoading, isError, error, data } = useQuery(['mentorship', mentorshipId], () => getMentorship(mentorshipId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8 flex justify-center items-center h-screen">
      <div className="py-8 w-full max-w-sm">
        <div className="shadow rounded-lg overflow-hidden p-8 bg-white border-2 border-gray-300">
          <div className="text-center">
            <h1 className="font-semibold text-2xl mb-4">Mentorship Profile</h1>
            <p className="mb-2 border-b border-gray-200 py-2"><strong>ID:</strong> {data.traineeId}</p>
            <p className="mb-2 border-b border-gray-200 py-2"><strong>First Name:</strong> {data.firstName}</p>
            <p className="mb-2 border-b border-gray-200 py-2"><strong>Last Name:</strong> {data.lastName}</p>
            <p className="mb-2 border-b border-gray-200 py-2"><strong>Email:</strong> {data.email}</p>
            <p className="mb-2 border-b border-gray-200 py-2"><strong>Weight:</strong> {data.weightInGrams}</p>
            <p className="mb-2 border-b border-gray-200 py-2"><strong>Height:</strong> {data.heightInCentimeters}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipDetailsPage;
