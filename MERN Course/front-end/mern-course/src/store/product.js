import { create } from "zustand";
import { updateProduct } from "../../../../back-end/controller/products.controller";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  },
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image)
      return { success: false, message: "Please fill all fields" };
    const res = await fetch("/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    console.log(data);
    set((state) => ({
      products: [...state.products, data],
    }));
    return { success: true, message: "Product Created Succesfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, { method: "Delete" });
    const data = await res.json();
    console.log("Called");
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    //! for some reason it gives undefined
    console.log(data.data);
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product,
      ),
    }));
    return { success: true, message: data.message };
  },
}));
