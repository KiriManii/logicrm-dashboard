// src/hooks/useCustomers.ts
import { useQuery } from '@tanstack/react-query';
import * as customerService from '../services/customers';

export const useCustomers = (limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['customers', limit, page],
    queryFn: () => customerService.getCustomers(limit, page),
    placeholderData: (previousData) => previousData, // Replace keepPreviousData
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
  });
};
