"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Incident } from '@/types';
import Loader from '@/app/components/Loader';
import IncidentDetail from './IncidentDetail';
import AdminNav from '@/app/components/admin/AdminNav';
import Container from '@/app/components/Container';

const IncidentDetailPage = () => {
  const { id } = useParams(); // Use useParams instead of router.query
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchIncident = async () => {
        try {
          const response = await axios.get<Incident>(`http://localhost:5000/api/incidents/${id}`);
          setIncident(response.data);
        } catch (error) {
          console.error('Error fetching incident data:', error);
          setError('Failed to load incident data.');
        } finally {
          setLoading(false);
        }
      };

      fetchIncident();
    }
  }, [id]);

  if (loading) return <Loader />; // Show a loading spinner while fetching data
  if (error) return <p>{error}</p>; // Show an error message if there was an issue

  if (!incident) return <p>No incident data available.</p>; // Show message if no data is found

  return (
    <>
      <AdminNav/>
    <Container>
      <IncidentDetail incident={incident} />
    </Container>
  </>
  );
};

export default IncidentDetailPage;
