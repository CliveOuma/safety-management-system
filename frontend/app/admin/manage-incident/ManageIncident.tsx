import React, { useCallback } from 'react';
import { Incident } from "@/types";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Heading from "@/app/components/Heading";
import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from 'axios';

interface ManageIncidentProps {
  incidents: Incident[];
  onDelete: (id: string) => void;
}

const ManageIncident: React.FC<ManageIncidentProps> = ({ incidents, onDelete }) => {
  const router = useRouter();

  const handleDelete = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error('Authentication token is missing. Please log in.');
        throw new Error("No authentication token found");
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Incident deleted successfully');
      onDelete(id); // Update the state in the parent component
    } catch (err) {
      toast.error('Failed to delete incident');
      console.log(err);
    }
  }, [onDelete]);

  const handleEdit = (id: string) => {
    router.push(`/edit-incident/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/incident/${id}`);
  };

  const rows = incidents.map((incident) => ({
    id: incident._id, // Unique ID for each incident
    date: incident.date,
    nearMiss: incident.nearMiss,
    reporter: incident.reporter,
    area: incident.area,
    name: incident.name,
    incident: incident.incident,
  }));

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 50, 
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 100, 
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    { 
      field: 'nearMiss', 
      headerName: 'Near Miss', 
      width: 120, 
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    { 
      field: 'reporter', 
      headerName: 'Reporter', 
      width: 150, 
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    { 
      field: 'area', 
      headerName: 'Area', 
      width: 150, 
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150, 
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    {
      field: 'incident', 
      headerName: 'Incident Description', 
      width: 200,
      renderCell: (params) => (
        <div className="truncate max-w-full text-gray-800">{params.value}</div>
      ),
      headerAlign: 'left', 
      headerClassName: 'header-cell', 
      cellClassName: 'data-cell'
    },
    {
      field: 'action', 
      headerName: 'Actions', 
      width: 150, 
      headerClassName: 'header-cell',
      renderCell: (params) => {
        return (
          <div className="flex justify-between items-center gap-2 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => handleView(params.row.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            />
            <ActionBtn
              icon={MdEdit}
              onClick={() => handleEdit(params.row.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
            />
          </div>
        );
      }
    },
  ];

  return (
    <div className="w-full mx-auto p-5 bg-white shadow-lg rounded-lg overflow-x-auto">
      <div className="mb-6">
        <Heading title="Manage Incidents" center />
      </div>
      <div className="w-full">
        <div className="w-full" style={{ height: 800 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "& .header-cell": {
                backgroundColor: "#f9fafb",
                fontWeight: "bold",
              },
              // Ensure the DataGrid takes the full width of the container
              "& .MuiDataGrid-viewport": {
                width: 'max-content',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageIncident;
