import React from 'react';
import Heading from './Heading';
import { Incident } from '@/types';
import IncidentTable from './IncidentTable';
import Loader from './Loader';

interface IncidentManagerProps {
  incidents: Incident[];
  isLoading: boolean;
}

const IncidentManager: React.FC<IncidentManagerProps> = ({ incidents, isLoading }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Heading title="Incident List" center />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <IncidentTable incidents={incidents} />
      )}
    </div>
  );
};

export default IncidentManager;
