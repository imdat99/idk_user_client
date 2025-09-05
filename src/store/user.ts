import {
  persist,
  subscribeWithSelector,
  combine,
  createJSONStorage,
} from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import { sync } from "./middleware/syncTabs";
import { create } from "zustand";

// Split state & actions for clearer typing
export interface BearDataState { bears: number }
export interface BearActions { increase: () => void }
export type BearState = BearDataState & BearActions

// Allow middleware-chained mutators

// const useBearStore = storeBuilder<BearState>()
//   .config(
//     combine<BearDataState, BearActions>(
//       { bears: 0 },
//       (set) => ({
//         increase: () => set((s) => ({ bears: s.bears + 1 })),
//       })
//     )
//   )
//   .use((f) => persist<BearState>(f, { name: 'bear-storage' }))
//   .use(subscribeWithSelector)
//   .use(immer)
//   .create()
const useBearStore = create<BearState>()(
  persist(
    subscribeWithSelector(
        combine(
          {
            bears: 0,
          },
          (set) => ({
            increase: () => set((s) => ({ bears: s.bears + 1 })),
          })
        )
    ),
    {
      name: "bear-storage", // key trong IndexedDB
      storage: createJSONStorage(() => localStorage),
    }
  )
);
sync("bears", useBearStore);
export default useBearStore;
