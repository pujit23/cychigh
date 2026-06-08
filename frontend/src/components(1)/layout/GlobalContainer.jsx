import React from 'react';

const GlobalContainer = ({ children }) => {
    return (
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 pt-[80px] pb-16">
            <div className="animate-fade-in relative w-full h-full">
                {children}
            </div>
        </main>
    );
};

export default GlobalContainer;
