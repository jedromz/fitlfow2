import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {axios} from '../../../../lib/axios';
import { useParams } from 'react-router-dom';

const fetchReport = async (id) => {
  const { data } = await axios.get(`/reports/${id}`);
  return data;
};

const fetchComments = async (id) => {
  const { data } = await axios.get(`/reports/${id}/comments`);
  return data;
};

const postComment = async (newComment) => {
  const { data } = await axios.post(`/reports/${newComment.reportId}/comments`, newComment);
  return data;
};

const ReportDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: report, isLoading: reportIsLoading, error: reportError } = useQuery(['report', id], () => fetchReport(id));
  const { data: comments, isLoading: commentsIsLoading, error: commentsError } = useQuery(['comments', id], () => fetchComments(id));
  
  const newCommentMutation = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
    },
  });

  const NewCommentForm = () => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const newComment = { text, reportId: id };
      newCommentMutation.mutate(newComment);
      setText('');
    };

    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          New comment:
        </label>
        <div className="mt-1">
          <textarea 
            onChange={e => setText(e.target.value)} 
            value={text}
            required 
            rows="3"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Add a comment..."></textarea>
        </div>
        <div className="mt-4">
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Post comment
          </button>
        </div>
      </form>
    );
};


  if (reportIsLoading || commentsIsLoading) {
    return <span>Loading...</span>;
  }

  if (reportError || commentsError) {
    return <span>Error: {reportError?.message || commentsError?.message}</span>;
  }

  return (
    <div className="m-4 p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Report Details</h2>
      <div className="mb-4">
        <div className="font-bold">Report ID:</div>
        <div>{report.id}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Date:</div>
        <div>{report.date}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Description:</div>
        <div>{report.description}</div>
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-6">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="mb-2">
            <div className="font-bold">Comment {index + 1}:</div>
            <div>{comment.text}</div>
          </div>
        ))
      ) : (
        <div>No comments found.</div>
      )}
      <NewCommentForm />
    </div>
  );
};

export default ReportDetails;
