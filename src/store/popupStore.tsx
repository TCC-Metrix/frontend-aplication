// store/index.ts
import { create } from 'zustand';

type State = {
  popupType: string;
  popupBody: string;
  popupTitle: string;
  isPopupActive: boolean;
  setPopupType: (type: string) => void;
  setPopupBody: (message: string) => void;
  setPopupTitle: (title: string) => void;
  setIsPopupActive: (isActive: boolean) => void;
  popupBtnFunction: Function;
  setPopupFunction: (func: Function) => void;
 };

const usePopupStore = create<State>((set) => ({
    popupType: '',
    isPopupActive: false,
    popupBody: '',
    popupTitle: '',
    popupBtnFunction: Function,
    setPopupType: (type) => set({ popupType: type }),
    setPopupBody: (message) => set({ popupBody: message }),
    setPopupTitle: (title) => set({ popupTitle: title }),
    setIsPopupActive: (isPopupActive) => set({ isPopupActive: isPopupActive }),
    setPopupFunction: (popupFunction: Function) => set({ popupBtnFunction: popupFunction })
}));

export default usePopupStore;
