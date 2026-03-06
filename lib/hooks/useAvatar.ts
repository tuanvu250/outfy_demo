"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { avatarApi } from "@/lib/api/avatar";
import { useAvatarStore } from "@/lib/store/avatarStore";
import type { BodyMeasurements } from "@/lib/types/avatar";

export function useAvatar() {
  const { avatar, setAvatar, setIsCreating } = useAvatarStore();

  const { isLoading, error } = useQuery({
    queryKey: ["avatar"],
    queryFn: async () => {
      const res = await avatarApi.get();
      setAvatar(res.data);
      return res.data;
    },
    retry: false,
  });

  const updateMeasurementsMutation = useMutation({
    mutationFn: (measurements: BodyMeasurements) =>
      avatarApi.updateMeasurements(measurements),
    onSuccess: ({ data }) => setAvatar(data),
  });

  const scanMutation = useMutation({
    mutationFn: (formData: FormData) => avatarApi.uploadScanImages(formData),
    onMutate: () => setIsCreating(true),
    onSuccess: ({ data }) => {
      setAvatar(data);
      setIsCreating(false);
    },
    onError: () => setIsCreating(false),
  });

  return {
    avatar,
    isLoading,
    error,
    updateMeasurements: updateMeasurementsMutation.mutate,
    scanAvatar: scanMutation.mutate,
    isUpdating: updateMeasurementsMutation.isPending,
    isScanning: scanMutation.isPending,
  };
}
