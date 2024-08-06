// components/IncidentDetailTable.tsx
import { Incident } from '@/types';

interface IncidentDetailTableProps {
  incident: Incident;
}

const IncidentDetailTable: React.FC<IncidentDetailTableProps> = ({ incident }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-indigo-600 text-white text-xs sm:text-sm leading-normal">
            <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">Date</th>
            <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">Near Miss</th>
            <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">Reporter</th>
            <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">Area</th>
            <th className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">Name</th>
            <th className="py-2 sm:py-3 px-4 sm:px-6 text-left">Incident Description</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-xs sm:text-sm font-medium">
          <tr className="hover:bg-gray-100 bg-gray-50">
            <td className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">{incident.date}</td>
            <td className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">{incident.nearMiss}</td>
            <td className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">{incident.reporter}</td>
            <td className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">{incident.area}</td>
            <td className="py-2 sm:py-3 px-4 sm:px-6 text-left border-r border-gray-300">{incident.name}</td>
            <td className="py-2 sm:py-3 px-4 sm:px-6 text-left">{incident.incident}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncidentDetailTable;
