import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, PlusCircle, User } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import './Navbar.css';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <Link to="/" className="nav-brand group">
          <span className="brand-icon">
            <span className="gradient-text text-2xl font-bold">L&F</span>
          </span>
          <span className="brand-text">Campus Finds</span>
        </Link>
        
        <div className="nav-search">
          <Input 
            icon={Search}
            placeholder="Search lost or found items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="nav-actions">
          <NavLink to="/post" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Button variant="ghost" size="sm" className="action-btn">
              <PlusCircle size={20} />
              <span>Post Item</span>
            </Button>
          </NavLink>
          
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Button variant="ghost" size="sm" className="action-btn">
              <User size={20} />
              <span>Dashboard</span>
            </Button>
          </NavLink>
        </div>
        
        {/* Mobile menu toggle (omitted for brevity, assume simple layout) */}
      </div>
    </nav>
  );
};

export default Navbar;
