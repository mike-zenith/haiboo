'use strict';

import React from 'react';
import { render } from '@testing-library/react';
import WithLoader from './WithLoader';

test('displays loader component when loading', () => {
    const component = () => (<p>component</p>);
    const loading = () => (<span>loading</span>);

    const WithLoaderDummy = WithLoader(component, loading);
    const { getByText } = render(<WithLoaderDummy isLoading={true} />);
    expect(() => getByText('component')).toThrow();
    expect(getByText('loading')).toBeTruthy();
});

test('displays component when not loading', () => {
    const component = () => (<p>component</p>);
    const loading = () => (<span>loading</span>);

    const WithLoaderDummy = WithLoader(component, loading);
    const { getByText } = render(<WithLoaderDummy isLoading={false} />);
    expect(getByText('component')).toBeTruthy();
    expect(() => getByText('loading')).toThrow();
});

test('passes properties to component', () => {
    const component = (props) => { const displayProps = JSON.stringify(props); return (<p>{displayProps}</p>); };
    const loading = () => (<span>loading</span>);

    const props = {
        p1: 'p1',
        p2: 'p2',
        p3: 'p3'
    };

    const WithLoaderDummy = WithLoader(component, loading);
    const { getByText } = render(<WithLoaderDummy isLoading={false} { ... props } />);
    expect(getByText(JSON.stringify(props))).toBeTruthy();
});
