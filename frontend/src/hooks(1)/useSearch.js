import { useState, useMemo } from 'react';

export const useSearch = (data, searchKeys = ['name', 'brand']) => {
    const [query, setQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!query) return data;
        
        const lowerQuery = query.toLowerCase();
        return data.filter(item => 
            searchKeys.some(key => 
                String(item[key]).toLowerCase().includes(lowerQuery)
            )
        );
    }, [data, query, searchKeys]);

    return { query, setQuery, filteredData };
};

export default useSearch;
