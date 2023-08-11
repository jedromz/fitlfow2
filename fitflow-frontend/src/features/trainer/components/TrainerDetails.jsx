import React from 'react'
import { axios } from '../../../lib/axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';

const TrainerDetails = () => {

    const getTrainer = async () => {
        const { data } = await axios.get(`trainers/10000`)
        return data
    }

    const { isLoading, isError, error, data } = useQuery(["trainer", 10000], getTrainer)

    if (isLoading) {
        return <pre>Loading...</pre>
    }
    if (isError) {
        return <pre>{JSON.stringify(error)}</pre>
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 flex justify-center items-center h-screen">
            <div className="py-8 w-full max-w-sm">
                <div className="shadow rounded-lg overflow-hidden p-8 bg-white border-2 border-gray-300">
                    {data && (
                        <div className="text-center">
                            <h1 className="font-semibold text-2xl mb-4">Trainer Profile</h1>
                            <p className="mb-2 border-b border-gray-200 py-2"><strong>ID:</strong> {data.id}</p>
                            <p className="mb-2 border-b border-gray-200 py-2"><strong>Email:</strong> {data.email}</p>
                            <p className="mb-2 border-b border-gray-200 py-2"><strong>First Name:</strong> {data.firstName}</p>
                            <p className="mb-2 border-b border-gray-200 py-2"><strong>Last Name:</strong> {data.lastName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TrainerDetails
