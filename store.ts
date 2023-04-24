import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCalendar = create()(
    persist(
        (set) => ({
            calendar: [],
            addData: (newData: []) => set({ calendar: [newData] })
        }),
        {name: 'calendar'}
    )
)