// src/hooks/useShipments.ts
import { useQuery } from '@tanstack/react-query';
import * as shipEngineService from '../services/shipengine';

export const useShipments = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ['shipments', page, pageSize],
    queryFn: () => shipEngineService.getShipments(page, pageSize),
    placeholderData: (previousData) => previousData, // Replace keepPreviousData
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useShipmentTracking = (shipmentId: string) => {
  return useQuery({
    queryKey: ['shipment-tracking', shipmentId],
    queryFn: () => shipEngineService.getShipmentTracking(shipmentId),
    enabled: !!shipmentId,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};
