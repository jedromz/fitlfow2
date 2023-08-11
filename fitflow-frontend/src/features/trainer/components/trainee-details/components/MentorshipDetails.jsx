import React from 'react'
import { useQuery } from 'react-query'
import { axios } from '../../../../../lib/axios';
import { useParams } from 'react-router-dom'

const MentorshipDetails = ({id}) => {

    const getMentorship = async () => {
        const { data } = await axios.get(`trainees/${id}/mentorship`)
        return data
    }

    const { isLoading, isError, error, data: mentorship } = useQuery(["mentorship", id], getMentorship)

    if (isLoading) {
        return <pre>Loading...</pre>
    }

    if (isError) {
        return <pre>{error.message}</pre>
    }

    const endDate = new Date(mentorship.endDate)
    const now = new Date()
    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))

    return (
        <div className="p-4 rounded  shadow-md h-full">
            <h2 className="text-2xl font-semibold">Mentorship Details</h2>
            <p>Start Date: {new Date(mentorship.startDate).toLocaleDateString()}</p>
            <p>End Date: {endDate.toLocaleDateString()}</p>
            <p>Days Left: {daysLeft}</p>
            <p>Price: ${mentorship.price}</p>
        </div>
    )
}

export default MentorshipDetails
