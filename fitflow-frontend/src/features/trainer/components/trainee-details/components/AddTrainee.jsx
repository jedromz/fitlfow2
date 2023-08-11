import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { axios } from '../../../../../lib/axios';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const AddTrainee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [weightInGrams, setWeightInGrams] = useState(0);
  const [heightInCentimeters, setHeightInCentimeters] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [trainerId, setTrainerId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const mutation = useMutation((data) => {
    return axios.post(`trainers/10000/trainees`, data, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    }).then((res) => res.data)
  }, {
    onSuccess: () => {
      setModalMessage('Success! The trainee has been added.');
      setIsOpen(true);
    },
    onError: () => {
      setModalMessage('An error occurred while trying to add the trainee.');
      setIsOpen(true);
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate({
      firstName,
      lastName,
      email,
      weightInGrams,
      heightInCentimeters,
      trainerId,
      startDate,
      endDate,
      price,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  }
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Alert Modal"
        style={customStyles}
      >
        <h2 className="text-lg font-semibold mb-4">{modalMessage}</h2>
        <button 
          onClick={closeModal} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          OK
        </button>
      </Modal>
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-bold mb-4">Mentorship Info</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="startDate">
              Start Date
            </label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} id="startDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="endDate">
              End Date
            </label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} id="endDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="price">
              Price
            </label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Price"/>
          </div>
         
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-4">Trainee Info</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="firstName">
              First Name
            </label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="First Name"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="lastName">
              Last Name
            </label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Last Name"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="weightInGrams">
              Weight in Grams
            </label>
            <input type="number" value={weightInGrams} onChange={(e) => setWeightInGrams(e.target.value)} id="weightInGrams" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Weight in Grams"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="heightInCentimeters">
              Height in Centimeters
            </label>
            <input type="number" value={heightInCentimeters} onChange={(e) => setHeightInCentimeters(e.target.value)} id="heightInCentimeters" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Height in Centimeters"/>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
          Add Trainee
        </button>
      </form>
    </div>
  )
  
}

export default AddTrainee
