import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wardrobeApi } from "@/lib/api/wardrobe";
import { useWardrobeStore } from "@/lib/store/wardrobeStore";

export function useWardrobe() {
  const queryClient = useQueryClient();
  const { filters, setClothingItems } = useWardrobeStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["wardrobe", filters],
    queryFn: async () => {
      const res = await wardrobeApi.getItems(filters);
      setClothingItems(res.data);
      return res.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => wardrobeApi.uploadItem(formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wardrobe"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => wardrobeApi.deleteItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wardrobe"] }),
  });

  return {
    items: data ?? [],
    isLoading,
    error,
    uploadItem: uploadMutation.mutate,
    deleteItem: deleteMutation.mutate,
    isUploading: uploadMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
