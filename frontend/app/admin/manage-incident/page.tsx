"use client";

import Container from "@/app/components/Container";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Incident } from "@/types";
import toast from "react-hot-toast";
import ManageIncident from "./ManageIncident";
import Loader from "@/app/components/Loader";

const ManageIncidentPage = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:10000/api/incidents");

        console.log(response.data); // Log the response data

        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
        setError("Failed to fetch incidents");
        toast.error("An error occurred while fetching incidents.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleDeleteIncident = useCallback((id: string) => {
    setIncidents((prevIncidents) => prevIncidents.filter(incident => incident._id !== id));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageIncident incidents={incidents} onDelete={handleDeleteIncident} />
      </Container>
    </div>
  );
};

export default ManageIncidentPage;
