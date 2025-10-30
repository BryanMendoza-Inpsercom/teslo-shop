import { tesloApi } from "@/api/teslo-api"
import type { ProductResponse } from "../interfaces/products.response";

interface Opciones {
    limit?: number | string;
    offset?: number | string; //numero de pagina
    gender?: string;
    sizes?: string;
    minPrice?: number;
    maxPrice?: number;
    query?: string;
}

export const getProductsAction = async (opciones: Opciones): Promise<ProductResponse> => {

    const { limit, offset, gender, sizes, minPrice, maxPrice, query } = opciones;

    const { data } = await tesloApi.get<ProductResponse>('/products', {
        params: {
            limit,
            offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            q:query
        }
    });

    const productos = data.products.map((producto) => ({
        ...producto,
        images: producto.images.map(
            image => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        )
    }))

    return {
        ...data,
        products: productos
    }
}