"use client"
import React, { useState, useEffect } from 'react';

const SearchBar = ({ data, initialSelected = [], setSearchParams, searchParams, onSelectionChange }) => {
    const [selectedItems, setSelectedItems] = useState(initialSelected || []);

    useEffect(() => {
        setSelectedItems(initialSelected);
    }, [initialSelected]);

    const handleSearch = (e) => {
        setSearchParams(e.target.value);
    };

    const handleToggleItem = (item) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

        if (isSelected) {
            const newSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
            setSelectedItems(newSelectedItems);
            onSelectionChange && onSelectionChange(newSelectedItems);
        } else if (selectedItems.length < 2) {
            const newSelectedItems = [...selectedItems, item];
            setSelectedItems(newSelectedItems);
            onSelectionChange && onSelectionChange(newSelectedItems);
        }
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchParams.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                value={searchParams}
                onChange={handleSearch}
                className="border p-2 m-2 w-full md:w-1/2"
                placeholder="Search..."
            />
            <div className="flex flex-wrap">
                {filteredData.map((item) => {
                    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);
                    return (
                        <div key={item.id} className="m-1 p-1 rounded-md border flex items-center">
                            <button
                                onClick={() => handleToggleItem(item)}
                                className={`p-2 rounded-md ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {item.name}
                            </button>
                            {isSelected && (
                                <button
                                    onClick={() => handleToggleItem(item)}
                                    className="ml-2 text-red-600"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchBar;
