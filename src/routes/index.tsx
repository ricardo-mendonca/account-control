import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetalheDeCategorias, ListagemDeBanco, ListagemDeCategorias, ListagemDeDespesas,DetalheDeDespesas,DetalheDeBanco} from '../pages';




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
        icon: 'add_card',
        path: '/bancos',
        label: 'Bancos',
      },
      {
        icon: 'category',
        path: '/categorias',
        label: 'Categorias',
      },
      {
        icon: 'account_balance',
        path: '/despesa',
        label: 'Despesas',
      },
   
      
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      
      <Route path="/categorias" element={<ListagemDeCategorias />} />
      <Route path="/categorias/:id" element={<DetalheDeCategorias />} />
      
      <Route path="/bancos" element={<ListagemDeBanco />} />
      <Route path="/bancos/:id" element={<DetalheDeBanco />} />

      <Route path="/despesa" element={<ListagemDeDespesas />} />
      <Route path="/despesa/:id" element={<DetalheDeDespesas />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};