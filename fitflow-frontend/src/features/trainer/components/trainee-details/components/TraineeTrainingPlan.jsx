import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../../lib/axios';
import { useParams } from 'react-router-dom';

const TraineeTrainingPlan = () => {
  const { id } = useParams();

  const getTrainingPlan = async () => {
    const { data } = await axios.get(`trainees/${id}/training-plan`);
    return data;
  };

  const { isLoading, isError, error, data: trainingPlan } = useQuery(['traineeTrainingPlan', id], getTrainingPlan);

  if (isLoading) {
    return <pre>Loading...</pre>;
  }

  if (isError) {
    return <pre>{error.message}</pre>;
  }

  return (
    <div className="p-4 rounded  shadow-md h-full">
       <h2 className="text-2xl font-semibold">Active Training Plan</h2>
      <p>Name: {trainingPlan.name}</p>
      <p>Description: {trainingPlan.description}</p>
      <p>Start Date: {trainingPlan.startDate}</p>
      <p>End Date: {trainingPlan.endDate}</p>
    </div>
  );
};

export default TraineeTrainingPlan;
