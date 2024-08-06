"use client"
import { useEffect, useState } from 'react';
import Heading from '../components/Heading';

interface SummaryProps {}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = () => {
  const [SummaryData, setSummaryData] = useState<SummaryDataType>({
    incidents: {
      label: 'Total Incidents',
      digit: 0,
    },
    admins: {
      label: 'Total Admins',
      digit: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of incidents
        const incidentsResponse = await fetch('http://localhost:5000/api/incidentcount');
        const incidentsData = await incidentsResponse.json();

        // Fetch total number of admins
        const adminsResponse = await fetch('http://localhost:5000/api/admincount');
        const adminsData = await adminsResponse.json();

        setSummaryData({
          incidents: {
            label: 'Total Incidents',
            digit: incidentsData.count, // Assuming count is returned from the API
          },
          admins: {
            label: 'Total Admins',
            digit: adminsData.count, // Assuming count is returned from the API
          },
        });
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchData();
  }, []);

  const summaryKeys = Object.keys(SummaryData);

  return (
    <div className='max-w-[1150px] m-auto'>
      <div className='mb-4 mt-8'>
        <Heading title='Statistics' center />
      </div>
      <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
        {summaryKeys &&
          summaryKeys.map((key) => (
            <div
              key={key}
              className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition'
            >
              <div className='text-xl md:text-4xl font-bold'>
                {SummaryData[key].digit}
              </div>
              <div>{SummaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summary;
