import React from 'react';
import { useParams } from 'react-router-dom';
import TraineeProfile from './components/TraineeProfile';
import TraineeTrainingPlan from './components/TraineeTrainingPlan';
import TraineeReport from './components/TraineeReports';
import MentorshipDetails from './components/MentorshipDetails';

const TraineeDetails = () => {
    const { id } = useParams();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-4 rounded bg-white shadow-md h-3/4 w-3/4">
                <div className="grid grid-cols-2 gap-4 h-full w-full">
                    <div className="h-full transition-transform duration-200 ease-out hover:scale-105 cursor-pointer text-center">
                        <TraineeProfile id={id}/>
                    </div>
                    <div className="h-full transition-transform duration-200 ease-out hover:scale-105 cursor-pointer text-center">
                        <TraineeReport id={id}/>
                    </div>
                    <div className="h-full transition-transform duration-200 ease-out hover:scale-105 cursor-pointer text-center">      
                        <TraineeTrainingPlan id={id}/>
                    </div>
                    <div className="h-full transition-transform duration-200 ease-out hover:scale-105 cursor-pointer text-center">  
                        <MentorshipDetails id={id}/>
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default TraineeDetails;
