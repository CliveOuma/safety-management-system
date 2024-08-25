import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { Incident } from '@/types';

interface IncidentFormFields {
  date: Date | null;
  incidentType: string;
  eventType: string;
  reporter: string;
  area: string;
  name: string;
  incidentDescription: string;
}

interface EditIncidentProps {
  incident: Incident;
  onIncidentUpdated: (incident: Incident) => void;
}

const EditIncident: React.FC<EditIncidentProps> = ({ incident, onIncidentUpdated }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IncidentFormFields>({
    defaultValues: {
      date: new Date(incident.date),
      incidentType: incident.incidentType,
      eventType: incident.eventType,
      reporter: incident.reporter,
      area: incident.area,
      name: incident.name,
      incidentDescription: incident.incidentDescription,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(incident.date));

  useEffect(() => {
    setValue('date', selectedDate); // Ensure the form reflects the selected date
  }, [selectedDate, setValue]);

  const onSubmit: SubmitHandler<IncidentFormFields> = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error('Authentication token is missing. Please log in.');
        throw new Error("No authentication token found");
      }

      // Format date to ISO string if required
      const formattedData = {
        ...data,
        date: selectedDate ? selectedDate.toISOString() : '', // Convert date to ISO string
      };
      
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents/${incident._id}`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        onIncidentUpdated(response.data);
        toast.success('Incident updated successfully');
        router.push('/admin/manage-incident');
      } else {
        toast.error('Failed to update incident');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Authentication token is invalid or expired. Please log in again.');
      } else {
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
        <div className="mb-4">
          <label htmlFor="date" className="block text-md font-medium text-gray-400">Date</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            disabled={isLoading}
            className={`w-full mt-3 p-4 peer pt-6 outline-none
              bg-white font-light border-2 rounded-md transition 
              disabled:opacity-70 disabled:cursor-not-allowed
              ${errors.date ? 'border-rose-400' : 'border-slate-300'}
              ${errors.date ? 'focus:border-rose-400' : 'focus:border-slate-300'}
            `}
            placeholderText="Select date"
            dateFormat="yyyy-MM-dd"
            required
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.date?.message === 'string' ? errors.date.message : 'Invalid date'}
            </p>
          )}
        </div>
        <Input
          id="incidentType"
          label="Incident Type"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="mb-4">
          <label htmlFor="eventType" className="block text-md font-medium text-gray-400">Event Type</label>
          <select
            id="eventType"
            {...register('eventType', { required: true })}
            disabled={isLoading}
            className={`w-full mt-3 p-4 peer pt-6 outline-none
              bg-white font-light border-2 rounded-md transition 
              disabled:opacity-70 disabled:cursor-not-allowed
              ${errors.eventType ? 'border-rose-400' : 'border-slate-300'}
              ${errors.eventType ? 'focus:border-rose-400' : 'focus:border-slate-300'}
            `}
          >
            <option value="">Choose an option</option>
            <option value="Near Miss">Near Miss</option>
            <option value="Accident">Accident</option>
            <option value="Accident">Incident</option>
          </select>
          {errors.incidentType && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.incidentType?.message === 'string' ? errors.incidentType.message : 'This field is required'}
            </p>
          )}
        </div>

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
          id="incidentDescription"
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
