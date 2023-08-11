import React from 'react'
import { axios } from '../../../lib/axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom';
const ReportList = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const getReports = async () => {
        const { data } = await axios.get('trainers/10000/reports')
        return data
    }

    const deleteReport = async (reportId) => {
        await axios.delete(`trainers/10000/reports/${reportId}`)
    }

    const { isLoading, isError, error, data } = useQuery("reports", getReports)
    const mutation = useMutation(deleteReport, {
      onSuccess: () => {
        queryClient.invalidateQueries('reports')
      },
    })

    const handleDelete = (reportId) => {
        mutation.mutate(reportId)
    }

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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add New
                    </button>
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
                                        Date
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((report) => (
                                    <tr key={report.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{report.id}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{report.date}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{report.description}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button  
                                            onClick={() => navigate(`/reports/${report.id}`, { state: report })}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Details
                                            </button>
                                            <button onClick={() => handleDelete(report.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Delete
                                            </button>
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

export default ReportList
