// store/index.ts
import { create } from 'zustand';

type State = {
  activeNavbar: boolean;
  popupType: string;
  popupBody: string;
  popupTitle: string;
  isPopupActive: boolean;
  setActiveNavbar: (isActive: boolean) => void;
  setPopupType: (type: string) => void;
  setPopupBody: (message: string) => void;
  setPopupTitle: (title: string) => void;
  setIsPopupActive: (isActive: boolean) => void;
 };

const useStore = create<State>((set) => ({
  isPopupActive: false,
  activeNavbar: false,
  popupType: '',
  popupBody: '',
  popupTitle: '',
  setActiveNavbar: (isActive) => set({ activeNavbar: isActive }),
  setPopupType: (type) => set({ popupBody: type }),
  setPopupBody: (message) => set({ popupBody: message }),
  setPopupTitle: (title) => set({ popupTitle: title }),
  setIsPopupActive: (isPopupActive) => set({ isPopupActive: isPopupActive }),
}));

export default useStore;
