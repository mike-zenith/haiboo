import React from 'react';

export default function WithLoader(Component, LoadingComponent) {
    return function WithLoaderComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <LoadingComponent />
        );
    };
}
