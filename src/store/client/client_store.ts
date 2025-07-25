import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface ClientStore {
    client: any; // Define the type of client as needed
    setClient: (client: any) => void;
}

export const useClientStore = create<ClientStore>()(
    persist(
        (set) => ({
            client: null as any,
            setClient: (client) => set({ client }),
        }),
        {
            name: 'client-storage', 
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);