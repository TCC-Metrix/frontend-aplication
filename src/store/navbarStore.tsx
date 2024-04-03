// store/index.ts
import { create } from 'zustand';

type State = {
  activeNavbar: boolean;
  setActiveNavbar: (isActive: boolean) => void;

 };

const useNavbarStore = create<State>((set) => ({
  
  setActiveNavbar: (isActive) => set({ activeNavbar: isActive }),
  activeNavbar: false,
}));

export default useNavbarStore;
