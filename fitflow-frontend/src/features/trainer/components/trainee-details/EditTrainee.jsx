import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import { axios } from '../../../../lib/axios';
import Modal from 'react-modal';

const EditTrainee = () => {
  const location = useLocation();
  const trainee = location.state;

  const [firstName, setFirstName] = useState(trainee.firstName);
  const [lastName, setLastName] = useState(trainee.lastName);
  const [email, setEmail] = useState(trainee.email);
  const [weightInGrams, setWeightInGrams] = useState(trainee.weightInGrams);
  const [heightInCentimeters, setHeightInCentimeters] = useState(trainee.heightInCentimeters);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const mutation = useMutation((data) => {
    return axios.put(`${trainee.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    }).then((res) => res.data)
  }, {
    onSuccess: () => {
      setModalContent({
        title: 'Success',
        content: 'Trainee successfully updated!',
      });
      setShowModal(true);
    },
    onError: (error) => {
      setModalContent({
        title: 'Error',
        content: `An error occurred: ${error.message}`,
      });
      setShowModal(true);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate({
      firstName,
      lastName,
      email,
      weightInGrams,
      heightInCentimeters,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {showModal && <Modal title={modalContent.title} content={modalContent.content} setShowModal={setShowModal} />}
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Trainee Info</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="First Name"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Last Name"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weightInGrams">
              Weight in Grams
            </label>
            <input type="number" value={weightInGrams} onChange={(e) => setWeightInGrams(e.target.value)} id="weightInGrams" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Weight in Grams"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heightInCentimeters">
              Height in Centimeters
            </label>
            <input type="number" value={heightInCentimeters} onChange={(e) => setHeightInCentimeters(e.target.value)} id="heightInCentimeters" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Height in Centimeters"/>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
            Update Trainee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainee;
