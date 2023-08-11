import React from 'react'
import { useQuery } from 'react-query'
import { axios } from '../../../../../lib/axios';
import { useParams } from 'react-router-dom'

const TraineeProfile = ({id}) => {

    const getTrainee = async () => {
        const { data } = await axios.get(`trainees/${id}`)
        return data
    }

    const { isLoading, isError, error, data: trainee } = useQuery(["trainee", id], getTrainee)

    if (isLoading) {
        return <pre>Loading...</pre>
    }

    if (isError) {
        return <pre>{error.message}</pre>
    }

    return (
        <div className="p-4 rounded  shadow-md h-full">
            <h2 className="text-2xl font-semibold">Trainee Details</h2>
            <p>Name: {trainee.firstName} {trainee.lastName}</p>
            <p>Email: {trainee.email}</p>
            <p>Height: {trainee.weightInGrams}cm</p>
            <p>Weight: {trainee.heightInCentimeters}kg</p>
        </div>
    )
}

export default TraineeProfile
