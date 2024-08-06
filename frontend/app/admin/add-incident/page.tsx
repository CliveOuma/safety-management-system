"use client"
import React from 'react';
import Container from '@/app/components/Container';
import FormWrap from '@/app/components/FormWrap';
import AddIncident from './AddIncident';
import { Incident } from '@/types';

// No need to pass onIncidentAdded here
const AddIncidentPage: React.FC = () => {
  const handleIncidentAdded = (newIncident: Incident) => {
    console.log('New incident added:', newIncident);
  };

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddIncident onIncidentAdded={handleIncidentAdded} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddIncidentPage;
