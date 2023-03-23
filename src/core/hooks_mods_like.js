import { apiClient } from '../core/api';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

export function useItems() {
  const [search] = useSearchParams({
    sort: 'name',
    minPrice: '0',
    maxPrice: '10000',
  });

  return useQuery(
    ['items', search.toString()],
    () =>
      apiClient
        .get('items', {
          params: search,
        })
        .then((res) => {
         // console.log(res.data); // Verificar el tipo de la respuesta
          // Map over the response data and add a `likes` field to each item
          const dataWithLikes = res.data.map((item) => {
            return {
              ...item,
              likes: item.like || 0,
            };
          });
          return dataWithLikes;
        }),
    {
      staleTime: 120000,
    },
  );
  
}
