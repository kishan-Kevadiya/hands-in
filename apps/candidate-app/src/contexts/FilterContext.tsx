import { FilterType } from '@/types/general.types';
import React, { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FilterData {
    jobTitle: string,
    setJobTitle: React.Dispatch<React.SetStateAction<string>>,
    filterData: FilterType | null
}

export const FilterDataContext = createContext<FilterData>({
    jobTitle: '',
    setJobTitle: () => { },
    filterData: null
})

export const FilterContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobTitle, setJobTitle] = useState('');
    const filterData = useForm<FilterType>();

    return (
        <FilterDataContext.Provider
            value={{
                jobTitle,
                setJobTitle,
                filterData: filterData.getValues()
            }}
        >
            {children}
        </FilterDataContext.Provider>
    )
}

export const useFilterContext = () => useContext(FilterDataContext)
