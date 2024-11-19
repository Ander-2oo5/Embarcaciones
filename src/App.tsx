import React, { useEffect, useState } from 'react';
import EmbarcacionForm from './components/EmbaForm';
import EmbarcacionList from './components/EmbaList';
import { Embarcacion } from './types';
import './App.css';

const App: React.FC = () => {
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [currentEmbarcacion, setCurrentEmbarcacion] = useState<Embarcacion | null>(null);

  useEffect(() => {
    fetch('/api/embarcaciones')
      .then(response => response.json())
      .then(data => setEmbarcaciones(data));
  }, []);

  const addEmbarcacion = (embarcacion: Omit<Embarcacion, 'id'>) => {
    fetch('/api/embarcaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embarcacion),
    })
      .then(response => response.json())
      .then(newEmbarcacion => setEmbarcaciones([...embarcaciones, newEmbarcacion]));
  };

  const updateEmbarcacion = (embarcacion: Embarcacion) => {
    fetch(`/api/embarcaciones/${embarcacion.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embarcacion),
    })
      .then(response => response.json())
      .then(updatedEmbarcacion => {
        setEmbarcaciones(embarcaciones.map(e => (e.id === updatedEmbarcacion.id ? updatedEmbarcacion : e)));
        setCurrentEmbarcacion(null);
      });
  };

  const deleteEmbarcacion = (id: number) => {
    fetch(`/api/embarcaciones/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setEmbarcaciones(embarcaciones.filter(e => e.id !== id));
    });
  };

  const handleEdit = (embarcacion: Embarcacion) => {
    setCurrentEmbarcacion(embarcacion);
  };

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Embarcaciones</h1>
      <EmbarcacionForm
        onAddEmbarcacion={addEmbarcacion}
        onUpdateEmbarcacion={updateEmbarcacion}
        currentEmbarcacion={currentEmbarcacion}
      />
      <EmbarcacionList
        embarcaciones={embarcaciones}
        onEdit={handleEdit}
        onDelete={deleteEmbarcacion}
      />
    </div>
  );
};

export default App;