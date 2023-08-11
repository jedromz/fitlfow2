import React, { useState } from 'react'
import { axios } from '../../../../lib/axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

const MentorshipList = () => {
    
    const getMentorships = async () => {
        const { data } = await axios.get('trainers/10000/mentorships')
        return data
    }

    const { isLoading, isError, error, data } = useQuery("mentorships", getMentorships)

    if (isLoading) {
        return <pre>Loading...</pre>
    }
    if (isError) {
        return <pre>{JSON.stringify(error)}</pre>
    }

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between mb-4">
                <Link to={`/trainer/10000/mentorship/add`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add New
                    </button>
                    </Link>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
    <thead>
        <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Start Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                End Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
            </th>
        </tr>
    </thead>
    <tbody>
        {data && data.map((mentorship) => (
            <tr key={mentorship.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{mentorship.id}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{mentorship.startDate}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{mentorship.endDate}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{mentorship.price}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Delete
                                            </button>
                                            <Link to={`/mentorship/details/${mentorship.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
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
    )
}

export default MentorshipList
