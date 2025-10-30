import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get.products.action"
import { useParams, useSearchParams } from "react-router"

export const useProducts = () => {

  const { gender } = useParams();
  const [searchParam] = useSearchParams();
  const limit = searchParam.get('limit') || 9;
  const page = searchParam.get('page') || 1;
  const sizes = searchParam.get('sizes') || "";
  const offset = (Number(page) - 1) * Number(limit);
  const price = searchParam.get('price') || 'any';
  const query = searchParam.get('query') || "";
  let minPrice = undefined;
  let maxPrice = undefined;

  switch(price)
  {
    case 'any': break;
    case '0-50': minPrice=0; maxPrice=50; break;
    case '50-100': minPrice=50; maxPrice=100; break;
    case '100-200': minPrice=100; maxPrice=200; break;
    case '200+' : minPrice=200; maxPrice=99999; break;
  }
  console.log(minPrice, maxPrice, price);

  return useQuery({
    queryKey: ['products', { offset, limit, gender, sizes, minPrice, maxPrice, query }],
    queryFn: () => getProductsAction({
      limit: isNaN(+limit) ? '0' : limit,
      offset: isNaN(offset) ? 0 : offset,
      gender: gender,
      sizes: sizes,
      minPrice,
      maxPrice,
      query
    }),
    staleTime: 1000 * 60 * 5
  })
}
