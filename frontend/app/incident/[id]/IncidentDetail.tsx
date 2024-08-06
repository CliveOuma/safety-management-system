import React from 'react';
import { Incident } from '@/types';
import Heading from '@/app/components/Heading';

interface IncidentDetailProps {
  incident: Incident;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident }) => {
  return (
    <div className="flex justify-center mt-4 items-center min-h-[70vh]">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <Heading title="Incident Details" center />
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full mt-3 border-separate border-spacing-0">
              <thead className="bg-blue-800">
                <tr>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left text-white border-r border-gray-300">Date</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left text-white border-r border-gray-300">Near Miss</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left text-white border-r border-gray-300">Reporter</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left text-white border-r border-gray-300">Area</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left text-white border-r border-gray-300">Name</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6 text-left text-white border-r border-gray-300">Incident Description</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-l border-r border-gray-300">{incident.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">{incident.nearMiss}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">{incident.reporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">{incident.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">{incident.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 break-words">{incident.incident}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
