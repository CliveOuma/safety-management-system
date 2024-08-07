"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Incident } from '@/types';
import IncidentManager from './components/IncidentManager';

const HomePage = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get<Incident[]>('http://localhost:10000/api/incidents');
        setIncidents(response.data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div>
      <IncidentManager incidents={incidents} isLoading={loading} />
    </div>
  );
};

export default HomePage;
