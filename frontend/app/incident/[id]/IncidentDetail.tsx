import React from 'react';
import { Incident } from '@/types';
import Heading from '@/app/components/Heading';
import { format } from 'date-fns';

interface IncidentDetailProps {
  incident: Incident;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident }) => {
  return (
    <div className="flex justify-center mt-4 items-center min-h-[70vh] px-4">
      <div className="w-full max-w-4xl p-4 sm:p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <Heading title="Incident Details" center />
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead className="bg-blue-800">
              <tr>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-r border-gray-300  w-1/4">Date</th>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-r border-gray-300  w-1/6">Incident Type</th>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-r border-gray-300  w-1/6">Event Type</th>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-r border-gray-300  w-1/6">Reporter</th>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-r border-gray-300  w-1/6">Area</th>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-r border-gray-300  w-1/6">Name</th>
                <th className="py-2 px-3 sm:px-4 text-left text-white border-gray-300  max-w-xs">Incident Description</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-4 sm:px-4 text-sm text-gray-700 border-l border-r border-gray-300  w-1/10">
                {format(new Date(incident.date), 'yyyy-MM-dd')}
                  </td>
                <td className="px-3 py-4 sm:px-4 text-sm text-gray-700 border-l border-r border-gray-300">{incident.incidentType}</td>
                <td className="px-3 py-4 sm:px-4 text-sm text-gray-700 border-r border-gray-300">{incident.eventType}</td>
                <td className="px-3 py-4 sm:px-4 text-sm text-gray-700 border-r border-gray-300">{incident.reporter}</td>
                <td className="px-3 py-4 sm:px-4 text-sm text-gray-700 border-r border-gray-300">{incident.area}</td>
                <td className="px-3 py-4 sm:px-4 text-sm text-gray-700 border-r border-gray-300">{incident.name}</td>
                <td className="px-3 py-4 text-sm text-gray-700   max-w-xs">{incident.incidentDescription}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
