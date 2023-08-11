import React, { useState } from 'react'
import { axios } from '../../../lib/axios'
import { useQuery } from 'react-query'
import TrainingPlanModal from './TrainingPlanModal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const TraineeList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [trainingPlans, setTrainingPlans] = useState([]);
    const navigate = useNavigate();


    const viewTrainingPlans = async (traineeId) => {
        const { data } = await axios.get(`trainees/${traineeId}/training-plans`);
        setTrainingPlans(data);
        setIsOpen(true);
    };
 
    
    const closeModal = () => {
        setIsOpen(false);
        setTrainingPlans([]);
    };

    const getTrainees = async () => {
        const { data } = await axios.get('trainers/10000/trainees/page?page=0&size=15')
        return data.content
    }

    const getTrainingPlans = async (traineeId) => {
        const { data } = await axios.get(`trainees/${traineeId}/training-plans`)
        return data
    }
    const deleteTrainee = async (traineeId) => {
        try {
            await axios.delete(`trainees/${traineeId}`);
            // useQuery refetch to refresh the data after deleting
            queryClient.invalidateQueries('trainees');
        } catch (error) {
            console.error(error);
        }
    }


    const { isLoading, isError, error, data } = useQuery("trainees", getTrainees)


    if (isLoading) {
        return <pre>Loading...</pre>
    }
    if (isError) {
        return <pre>{JSON.stringify(error)}</pre>
    }

    return (
        <div className="container mx-auto px-4 sm:px-8">
        <TrainingPlanModal isOpen={isOpen} onClose={closeModal} trainingPlans={trainingPlans} />
        <div className="py-8">
            <div className="flex justify-between mb-4">
            <Link to="/trainer/new-trainee">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New
                </button>
            </Link>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table className="min-w-full leading-normal">
    <thead>
        <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                First Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
            </th>
        </tr>
    </thead>
    <tbody>
        {data && data.map((trainee) => (
            <tr key={trainee.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{trainee.id}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{trainee.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{trainee.firstName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{trainee.lastName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
<button
  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
  onClick={() => navigate(`/trainer/edit-trainee/${trainee.id}`, { state: trainee })}
>
  Edit
</button>
<button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
    onClick={() => deleteTrainee(trainee.id)}
>
    Delete
</button>
                    <Link to={`/trainer/trainee-details/${trainee.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Details
    </Link>
                </td>
            </tr>
        ))}
    </tbody>
</table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TraineeList
