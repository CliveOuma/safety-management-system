
export type Incident = {
  _id: string;
  date: string; // Format as 'yyyy-MM-dd'
  incidentType: string;
  eventType: 'Near Miss' | 'Accident' | 'Incident';
  reporter: string;
  area: string;
  name: string;
  incidentDescription: string;
};
