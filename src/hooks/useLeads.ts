// src/hooks/useLeads.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as hubspotService from '../services/hubspot';
import { Lead } from '../types';

export const useLeads = (limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['leads', limit, page],
    queryFn: () => hubspotService.getLeads(limit, page),
    placeholderData: (previousData) => previousData, // Replace keepPreviousData
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (leadData: Partial<Lead>) => hubspotService.createLead(leadData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};
