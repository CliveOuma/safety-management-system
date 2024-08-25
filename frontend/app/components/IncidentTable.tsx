import { format } from 'date-fns';
import React from 'react';
import { Incident } from '@/types';

interface IncidentTableProps {
  incidents: Incident[];
}

const IncidentTable: React.FC<IncidentTableProps> = ({ incidents }) => {
  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300 table-fixed">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6">Date</th>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6">Incident Type</th>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6">Event Type</th>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6">Reporter</th>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6">Area</th>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6">Name</th>
            <th className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 w-1/6 max-w-xs truncate">
              Incident Description
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {incidents.map((incident) => (
            <tr key={incident._id} className="hover:bg-gray-50 transition-colors border-b border-gray-300">
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 truncate">
                {format(new Date(incident.date), 'yyyy-MM-dd')}
              </td>
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 truncate">{incident.incidentType}</td>
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 truncate">{incident.eventType}</td>
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 truncate">{incident.reporter}</td>
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 truncate">{incident.area}</td>
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300 truncate">{incident.name}</td>
              <td className="py-2 px-2 sm:px-4 text-left border-r border-gray-300  max-w-xs">
                {incident.incidentDescription}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
