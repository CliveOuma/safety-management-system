"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import TextArea from '@/app/components/inputs/TextArea';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Incident } from '@/types';

interface AddIncidentProps {
  onIncidentAdded?: (newIncident: Incident) => void;
}

const AddIncident: React.FC<AddIncidentProps> = ({ onIncidentAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      date: '',
      nearMiss: '',
      reporter: '',
      area: '',
      name: '',
      incident: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents`, data);
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
        <Input
          id="date"
          label="Date"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="date"
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
        <Button label="Add Incident" type="submit" disabled={isLoading} />
      </form>
    </>
  );
};

export default AddIncident;
