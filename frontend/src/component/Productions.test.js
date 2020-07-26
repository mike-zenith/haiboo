'use strict';

import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Productions from './Productions';

test('Renders n production', () => {
    const productionCount = 3;
    const defaultProduction = { Id: 0 };
    const prods = Array.from(
        { length: productionCount },
        (_, idx) => Object.assign({ ... defaultProduction }, { Id: ++idx })
    );

    const { container } = render(<Productions productions={prods} />);
    expect(container.getElementsByTagName('li').length).toBe(productionCount);
});

test('Renders no production found', () => {
    const { getByText } = render(<Productions productions={[]} />);
    expect(getByText(/No productions/i)).toBeTruthy();
});

test('Appends delete functionality', () => {
    const deleteProductionCallback = jest.fn();
    const prods = [
        {
            Id: '12',
            Name: 'N1'
        },
        {
            Id: '13',
            Name: 'N2'
        }
    ];
    const deleteProd = { ... prods[1] };
    const { queryByTitle } = render(<Productions productions={prods} deleteProduction={deleteProductionCallback} />);
    prods.forEach(prod => {
        expect(queryByTitle(`Delete ${prod.Name}`)).toBeInTheDocument();
    })
    fireEvent.click(queryByTitle(`Delete ${deleteProd.Name}`));
    expect(deleteProductionCallback).toBeCalledWith(deleteProd.Id);
});
