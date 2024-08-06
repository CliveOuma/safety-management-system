"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Incident } from '@/types';
import EditIncident from './EditIncident';
import Loader from '@/app/components/Loader';
import AdminNav from '@/app/components/admin/AdminNav';
import Container from '@/app/components/Container';
import FormWrap from '@/app/components/FormWrap';

const EditIncidentPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get ID from useParams
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

  const handleIncidentUpdated = (updatedIncident: Incident) => {
    // Redirect to manage incidents page after successful update
    router.push('/admin/manage-incident');
  };

  const handleClose = () => {
    // Redirect to manage incidents page when closing the form
    router.push('/admin/manage-incident');
  };

  if (loading) return <Loader />; // Show a loading spinner while fetching data
  if (error) return <p>{error}</p>; // Show an error message if there was an issue

  if (!incident) return <p>No incident data available.</p>; // Show message if no data is found

  return (
    <>
    <AdminNav/>
    <Container>
    <FormWrap>
      <EditIncident 
        incident={incident} 
        onIncidentUpdated={handleIncidentUpdated} 
        onClose={handleClose} 
      />
    </FormWrap>
    </Container>
    </>
  );
};

export default EditIncidentPage;
