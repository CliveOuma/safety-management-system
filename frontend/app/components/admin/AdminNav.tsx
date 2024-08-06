"use client"
import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "@/app/components/Container";


const AdminNav = () => {

const pathname = usePathname()

    return ( 
        <div className="w-full shadow-sm top-20 border-b-[1px]
        pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between
                md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                <Link href='/admin'>
                <AdminNavItem label="Summary" icon={MdDashboard} 
                selected={pathname === "/admin"}/>
                </Link>
                <Link href='/admin/add-incident'>
                <AdminNavItem label="AddIncident" icon={MdLibraryAdd} 
                selected={pathname === "/admin/add-incident"}/>
                </Link>
                <Link href='/admin/manage-incident'>
                <AdminNavItem label="ManageIncident" icon={MdDns} 
                selected={pathname === "/admin/manage-incident"}/>
                </Link>
                </div>
            </Container>

        </div>
     );
}
 
export default AdminNav;