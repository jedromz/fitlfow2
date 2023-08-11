import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../../lib/axios';
import { useParams } from 'react-router-dom';

const TraineeReport = () => {
  const { id } = useParams();

  const getTraineeReport = async () => {
    const { data } = await axios.get(`trainees/${id}/report`);
    return data;
  };

  const { isLoading, isError, error, data: report } = useQuery(['traineeReport', id], getTraineeReport);

  if (isLoading) {
    return <pre>Loading...</pre>;
  }

  if (isError) {
    return <pre>{error.message}</pre>;
  }

  return (
    <div className="p-4 rounded shadow-md h-full">
      <h2 className="text-2xl font-semibold">Last Report</h2>
      <p>Date: {report.date}</p>
      <p>Description: {report.description}</p>
      <p>{report.text}</p>
    </div>
  );
};

export default TraineeReport;
