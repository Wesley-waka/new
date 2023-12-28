import "./AdminSidebar.css"
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className='admin-sidebar-nav-container'>
      <nav className='admin-sidebar-nav'>
        <NavLink exact to='/admin/me'>
          <i className='fa-solid fa-table-columns'></i>&nbsp; Dashboard
        </NavLink>
        <NavLink exact to='/admin/all-practitioners'>
          <i className='fa-solid fa-user'></i>&nbsp; All Practitioners
        </NavLink>
        <NavLink exact to='/admin/add-practitioner'>
          <i className='fa-solid fa-user-plus'></i>&nbsp; Add Practitioner
        </NavLink>
        <NavLink exact to='/admin/add-practitioner-profile'>
          <i className='fa-solid fa-address-card'></i>&nbsp; Add Practitioner
          Profile
        </NavLink>
        <NavLink exact to='/admin/products'>
          <i className='fa-solid fa-pills'></i>&nbsp; All Products
        </NavLink>
        <NavLink exact to='/admin/add-product'>
          <i className='fa-solid fa-prescription-bottle-medical'></i>&nbsp; Add
          Product
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminSidebar