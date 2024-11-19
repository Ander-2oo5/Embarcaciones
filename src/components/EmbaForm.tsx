import React, { useState, useEffect } from 'react';
import { Embarcacion } from '../types';

interface EmbarcacionFormProps {
  onAddEmbarcacion: (embarcacion: Omit<Embarcacion, 'id'>) => void;
  onUpdateEmbarcacion: (embarcacion: Embarcacion) => void;
  currentEmbarcacion: Embarcacion | null;
}

const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({ onAddEmbarcacion, onUpdateEmbarcacion, currentEmbarcacion }) => {
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaProgramada, setFechaProgramada] = useState('');

  useEffect(() => {
    if (currentEmbarcacion) {
      setNombre(currentEmbarcacion.nombre);
      setCapacidad(currentEmbarcacion.capacidad.toString());
      setDescripcion(currentEmbarcacion.descripcion);
      setFechaProgramada(currentEmbarcacion.fechaProgramada);
    }
  }, [currentEmbarcacion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const capacidadNumber = parseFloat(capacidad);
    if (currentEmbarcacion) {
      onUpdateEmbarcacion({ id: currentEmbarcacion.id, nombre, capacidad: capacidadNumber, descripcion, fechaProgramada });
    } else {
      onAddEmbarcacion({ nombre, capacidad: capacidadNumber, descripcion, fechaProgramada });
    }
    setNombre('');
    setCapacidad('');
    setDescripcion('');
    setFechaProgramada('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Capacidad:</label>
        <input
          type="number"
          name="capacidad"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha Programada:</label>
        <input
          type="date"
          name="fechaProgramada"
          value={fechaProgramada}
          onChange={(e) => setFechaProgramada(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {currentEmbarcacion ? 'Guardar Cambios' : 'Agregar Embarcación'}
      </button>
    </form>
  );
};

export default EmbarcacionForm;