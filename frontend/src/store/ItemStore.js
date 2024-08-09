import { create } from "zustand";
import axios from "axios";

const useItemStore = create((set) => ({
  formData: { item_name: "", price: "" },
  items: [],
  setFormData: (newFormData) =>
    set((state) => ({
      formData: { ...state.formData, ...newFormData },
    })),
  fetchItems: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ITEMS_SERVICE_URL}/items/getitems`, {
        withCredentials: true,
      });
      set({ items: response.data });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  },
  createItem: async (userId, formData) => {
    try {
      const requestData = { ...formData, user_id: userId };
      await axios.post(`${process.env.REACT_APP_ITEMS_SERVICE_URL}/items/create`, requestData, {
        withCredentials: true,
      });
      set((state) => ({ items: [...state.items, requestData] }));
    } catch (error) {
      console.error("Error creating item:", error);
    }
  },
}));

export default useItemStore;
