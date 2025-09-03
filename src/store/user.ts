import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";
import { sync } from "./middleware/syncTabs";

interface BearState {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearState>()(
  persist(subscribeWithSelector(
    (set) => ({
      bears: 0,
      increase: () => set((s) => ({ bears: s.bears + 1 })),
    })),
    {
      name: "bear-storage", // key trong IndexedDB
      storage: createJSONStorage(() => localStorage)
    }
  )
);
sync("bears", useBearStore);
export default useBearStore;
