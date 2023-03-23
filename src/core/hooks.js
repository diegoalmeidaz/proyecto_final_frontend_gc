import { getSingleItem } from './api_items';
import { useQuery } from 'react-query';
import { useSearchParams, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getUserInfo } from './api_users';
import { apiClient } from './api_base_url';


export function useItems() {
  const [search] = useSearchParams({
    sort: 'name',
    minPrice: '0',
    maxPrice: '10000',
    colors:''
  });

  return useQuery(
    ['items', search.toString()],
    () =>
      apiClient
        .get('items', {
          params: search,
        })
        .then((res) => res.data),
    {
      staleTime: 120000,
    },
  );
}


export function useAdminItems() {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    apiClient
      .get('items')
      .then((res) => {
        setProducts(res.data.products);

        getUserInfo().then((user) => {
          setUserRole(user.role);
          setUserId(user.user_id);
        });
      });
  }, []);

  const visibleProducts = useMemo(() => {
    return userRole === 'admin'
      ? products
      : products.filter((product) => product.user_id === userId);
  }, [products, userRole, userId]);

  return {
    products: visibleProducts,
  };
}



export function useSingleItem(item_id) {
  const { data, error, isLoading } = useQuery(
    ['singleItem', item_id],
    () => getSingleItem(item_id),
    {
      enabled: item_id !== undefined,
      refetchOnWindowFocus: false,
    }
  );
 // console.log('useSingleItem data:', data, 'error:', error, 'isLoading:', isLoading);
 // console.log('useSingleItem itemId:', item_id);

  return {
    item: data,
    error,
    isLoading,
  };
}

