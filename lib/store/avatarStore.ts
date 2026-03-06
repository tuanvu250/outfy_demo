import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Avatar, AvatarSetupData, BodyMeasurements, Gender } from "@/lib/types/avatar";

interface AvatarStore {
  avatar: Avatar | null;
  setupData: Partial<AvatarSetupData>;
  isCreating: boolean;
  setAvatar: (avatar: Avatar) => void;
  setSetupData: (data: Partial<AvatarSetupData>) => void;
  setMeasurements: (measurements: BodyMeasurements) => void;
  setIsCreating: (val: boolean) => void;
  clearSetupData: () => void;
}

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set) => ({
      avatar: null,
      setupData: {},
      isCreating: false,
      setAvatar: (avatar) => set({ avatar }),
      setSetupData: (data) =>
        set((state) => ({ setupData: { ...state.setupData, ...data } })),
      setMeasurements: (measurements) =>
        set((state) => ({
          avatar: state.avatar ? { ...state.avatar, measurements } : null,
        })),
      setIsCreating: (val) => set({ isCreating: val }),
      clearSetupData: () => set({ setupData: {} }),
    }),
    {
      name: "outfy-avatar",
      partialize: (state) => ({ avatar: state.avatar }),
    }
  )
);
