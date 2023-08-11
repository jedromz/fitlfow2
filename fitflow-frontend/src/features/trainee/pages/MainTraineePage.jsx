import React from 'react';
import { Link } from 'react-router-dom';

const DashboardTile = ({ children }) => {
  return (
    <div
      className="flex items-center justify-center w-full h-80 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
    >
      {children}
    </div>
  );
};

const Tile = ({ title, link }) => {
  return (
    <Link
      to={`/${link.toLowerCase()}`}
      className="flex items-center justify-center w-full h-80 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
    >
      <h2 className="text-3xl font-bold">{title}</h2>
    </Link>
  );
};

export const MainTraineePage = () => {
  const tilesInfo = [
    {
      title: 'Training Plan',
      link: 'trainer/trainee-list'
    },
    {
      title: 'Measurements',
      link: 'trainer/reports'
    },
    {
      title: 'Mentorship',
      link: 'trainer/memberships'
    },
    {
      title: 'Reports',
      link: 'trainer/profile'
    },
    {
      title: 'Me',
      link: 'trainer/profile'
    },
    {
      title: 'Settings',
      link: 'trainer/memberships'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Trainee Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {tilesInfo.map(({title, link}, index) => (
          <DashboardTile key={index}>
            <Tile title={title} link={link} />
          </DashboardTile>
        ))}
      </div>
    </div>
  );
};
export default MainTraineePage;