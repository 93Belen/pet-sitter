import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCalendar = create()(
    persist(
        (set) => ({
            calendar: []
        }),
        {name: 'calendar'}
    )
)