import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../actions/get-productId.action";

export const useProducts = (id: string) => {


    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductById(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!id
    });
    //TODO MANEJAR LA MUTACION

    return {
        ...query
    }
}
