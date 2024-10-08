import { Request, Response } from 'express';
import Incident from '../models/incident';

export const createIncident = async (req: Request, res: Response) => {
  try {
    const { date, incidentType, eventType, reporter, area, name, incidentDescription } = req.body;
    if (!date || !incidentType || !eventType || !reporter || !area || !name || !incidentDescription) {
      throw new Error('All fields are required');
    }
    const newIncident = new Incident({ date, incidentType, eventType, reporter, area, name, incidentDescription });
    await newIncident.save();
    res.status(201).send(newIncident);
  } catch (error) {
    console.error('Error saving incident:', error);
    res.status(400).send({ message: 'Incident not saved' });
  }
};

export const updateIncident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, incidentType, eventType, reporter, area, name, incidentDescription } = req.body;
    const updatedIncident = await Incident.findByIdAndUpdate(id, { date, incidentType, eventType, reporter, area, name, incidentDescription }, { new: true });
    if (!updatedIncident) {
      return res.status(404).send({ message: 'Incident not found' });
    }
    res.status(200).send(updatedIncident);
  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(400).send({ message: 'Error updating incident' });
  }
};


export const deleteIncident = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const incident = await Incident.findByIdAndDelete(id);
    if (!incident) {
      return res.status(404).send({ message: 'Incident not found' });
    }

    res.status(200).send({ message: 'Incident deleted successfully' });
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const incidents = await Incident.find();
    res.status(200).send(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error); // Detailed logging
    res.status(500).send({ message: 'Error fetching incidents' });
  }
};


export const getIncidentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(404).send({ message: 'Incident not found' });
    }
    res.status(200).send(incident);
  } catch (error) {
    console.error('Error fetching incident:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


export const getIncidentCount = async (req: Request, res: Response) => {
  try {
    const incidentCount = await Incident.countDocuments();
    res.status(200).json({ count: incidentCount });
  } catch (error) {
    console.error('Error fetching incident count:', error);
    res.status(500).json({ message: 'Error fetching incident count' });
  }
};
