import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: "Safety system Admin Dashboard",
    description: "Safety management system Admin Dashboard"
}



const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return (
    <div>
        <AdminNav/>
        {children}
        </div>

    );
}

export default AdminLayout;