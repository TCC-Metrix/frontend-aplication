// store/index.ts
import {create} from 'zustand';

type State = {
  activeNavbar: boolean;
  setActiveNavbar: (isActive: boolean) => void;
};

const useStore = create<State>((set) => ({
  activeNavbar: false,
  setActiveNavbar: (isActive) => set({ activeNavbar: isActive }),
}));

export default useStore;
