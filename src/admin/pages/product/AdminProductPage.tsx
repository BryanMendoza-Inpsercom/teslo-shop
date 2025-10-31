import { Navigate, useParams } from 'react-router';
import { useProducts } from '@/admin/hooks/useProducts';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';

export const AdminProductPage = () => {
  const { id } = useParams();

  const { isLoading, data: producto, isError } = useProducts(id || '');
  if (isLoading) return <CustomFullScreenLoading />
  if (isError) return <Navigate to="/" />

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';


  if (!producto) return <Navigate to="/admin/products" />

  return <AdminProductForm
    title={title}
    subtitle={subtitle}
    product={producto} />

};