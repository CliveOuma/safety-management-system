import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import TextArea from '@/app/components/inputs/TextArea';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Incident } from '@/types';

interface AddIncidentProps {
  onIncidentAdded?: (newIncident: Incident) => void;
}

const AddIncident: React.FC<AddIncidentProps> = ({ onIncidentAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      date: '',
      incidentType: '',
      eventType: '',
      reporter: '',
      area: '',
      name: '',
      incidentDescription: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : '', // Format date
        incidentDescription: data.incidentDescription.trim(), // Ensure no leading/trailing spaces
        incidentType: data.incidentType.trim(), // Ensure no leading/trailing spaces
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents`, formattedData);
      const newIncident: Incident = response.data;

      if (onIncidentAdded) {
        onIncidentAdded(newIncident);
      }

      toast.success('Incident created successfully');
      reset();
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create incident');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Add an Incident" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
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
            popperPlacement="right-start"
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
            <option value="Incident">Incident</option>
          </select>
          {errors.eventType && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.eventType?.message === 'string' ? errors.eventType.message : 'This field is required'}
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
        <Button label="Add a Report" type="submit" disabled={isLoading} />
      </form>
    </>
  );
};

export default AddIncident;
