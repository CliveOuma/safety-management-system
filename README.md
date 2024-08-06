## Safety Management System for Cylinder Production Company


## Overview

This Safety Management System is designed specifically for a cylinder production company to record and manage near-miss incidents. The system ensures that all potential safety hazards are documented, reviewed, and addressed promptly. It features user registration, role-based authentication, and a responsive interface to facilitate effective incident management.


## Features

- User Authentication and Authorization

- User Registration and Login: Users can register and log in to the system.

- Role-Based Authentication: Role-based access control ensures that only admins can access the admin dashboard to manage incidents.

- JWT Authentication: JSON Web Tokens are used to secure endpoints and ensure authenticated access.

## Incident Management

- CRUD Operations: Admins can Create, Read, Update, and Delete incident records.

- Incident Reporting: Users can view and report near-miss incidents.

- Responsive Design: The application is responsive and works seamlessly on various devices.

## Tech Stack

- React & Next.js: For building the user interface

- TypeScript: For type safety and improved development experience.

- Tailwind CSS: For styling and creating a consistent and responsive design.

- Node.js & Express: For building the backend API and handling server-side logic.

- MongoDB: For storing incident records and user data.

- JSON Web Tokens (JWT): For securing authentication and authorization.

## Steps

- Install dependencies:

- npm install

- Set up environment variables:

Create a .env file in the root directory and add the following:

- MONGO_URI=your_mongodb_connection_string

- JWT_SECRET=your_jwt_secret

## Usage

- User Registration and Login

- Register a new user:

- Navigate to the registration page.

- Fill in the required details and submit the form.

- Log in as a user:



## Log in as an admin.

Navigate to the admin dashboard via the admin panel.

## Manage Incidents:

- Create Incident: Fill in the incident details and submit the form.

- View Incidents: Browse through the list of reported incidents.

- Edit Incident: Update the details of an existing incident.

- Delete Incident: Remove an incident from the list.


