import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetalheDeCategorias, ListagemDeCategorias, ListagemDeDespesas } from '../pages';
import { DetalheDeDespesas } from '../pages/despesas/DetalheDeDespesas';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'category',
        path: '/categorias',
        label: 'Categorias',
      },
      {
        icon: 'account_balance',
        path: '/despesas',
        label: 'Despesas',
      },
      
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      
      <Route path="/categorias" element={<ListagemDeCategorias />} />
      <Route path="/categorias/detalhe/:id" element={<DetalheDeCategorias />} />
      
      <Route path="/despesas" element={<ListagemDeDespesas />} />
      <Route path="/despesas/detalhe/:id" element={<DetalheDeDespesas />} />


      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};