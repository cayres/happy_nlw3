import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

export function AddButton() {
  return (
    <Link to="/add" className="create-orphanage">
      <FiPlus size={64} color="#fff" />
    </Link>
  );
}
