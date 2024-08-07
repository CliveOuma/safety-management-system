import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { useState } from 'react';
import { Incident } from '@/types';

interface IncidentFormFields {
  date: string;
  nearMiss: string;
  reporter: string;
  area: string;
  name: string;
  incident: string;
}

interface EditIncidentProps {
  incident: Incident;
  onIncidentUpdated: (incident: Incident) => void;
  onClose: () => void;
}

const EditIncident = ({ incident, onIncidentUpdated }: EditIncidentProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IncidentFormFields>({
    defaultValues: {
      date: incident.date,
      nearMiss: incident.nearMiss,
      reporter: incident.reporter,
      area: incident.area,
      name: incident.name,
      incident: incident.incident,
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<IncidentFormFields> = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error('Authentication token is missing. Please log in.');
        throw new Error("No authentication token found");
      }

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents/${incident._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        onIncidentUpdated(response.data); // Invoke callback
        toast.success('Incident updated successfully'); // Show success message
        router.push('/admin/manage-incident');
      } else {
        toast.error('Failed to update incident');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Handle specific 401 Unauthorized error
        toast.error('Authentication token is invalid or expired. Please log in again.');
      } else {
        // General error handling
        console.error("Error updating incident:", error);
        toast.error('Failed to update incident');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Edit Incident" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="date"
          label="Date"
          type="date"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="nearMiss"
          label="Near Miss"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="reporter"
          label="Reporter"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="area"
          label="Area"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <TextArea
          id="incident"
          label="Incident Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="flex space-x-4">
          <Button label="Update Incident" type="submit" disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default EditIncident;
