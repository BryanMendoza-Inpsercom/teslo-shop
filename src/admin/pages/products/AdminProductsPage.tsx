import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProducts } from "@/shop/hooks/useProducts"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {

  const { data, isLoading } = useProducts();

  if (isLoading) return <CustomFullScreenLoading />

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos" />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button><PlusIcon />Nuevo Producto</Button>
          </Link>
        </div>

      </div>

      {/* tabla */}
      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            Array.isArray(data?.products) && data?.products.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell className="font-medium">{producto.id.slice(0, 8)}</TableCell>
                <TableCell>
                  <img
                    src={producto.images[0]}
                    alt={producto.title}
                    className="w-10 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link className="hover:text-blue-500 underline" to={`/admin/products/${producto.id}`}>
                  {producto.title}
                  </Link>
                  </TableCell>
                <TableCell>{producto.price}</TableCell>
                <TableCell>{producto.gender}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>{producto.sizes?.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <Link className="hover:text-blue-500" to={`/admin/products/${producto.id}`}>Editar</Link>
                </TableCell>
              </TableRow>
            )
            )
          }

        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 1} />
    </>
  )
}
