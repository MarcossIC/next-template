import type { StoreInitializer, ZustandStore } from '@/types/storeTypes';
import { type ReactNode } from 'react';
import { createStore } from 'zustand';

/*See full example https://github.com/vercel/next.js/tree/canary/examples/with-zustand */
export const createZustandStore = <S, A>(storeInitializer: StoreInitializer<S, A>, preloadedState: Partial<S>) =>
	createStore<ZustandStore<S, A>>((set, get) => storeInitializer(set, get, preloadedState));

export interface ProviderProps<S, A> {
	children: ReactNode;
	storeInitializer: StoreInitializer<S, A>;
	preloadedState: Partial<S>;
}
