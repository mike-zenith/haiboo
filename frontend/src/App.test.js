'use strict';

import '@testing-library/jest-dom';

import React from 'react';
import {render, cleanup, fireEvent, screen, getByRole, queryByRole} from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import App from './App';

// https://github.com/testing-library/react-testing-library#suppressing-unnecessary-warnings-on-react-dom-168
const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }
});

afterAll(() => {
    console.error = originalError
});

afterEach(() => {
    cleanup();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function queryByInputName(container, field) {
    return container.querySelector(`input[name="${field}"],select[name="${field}"]`);
}

test('Does only render list when api is ready (loading doesnt trigger rendering empty list)', async () => {
    const fakeApi = { async getAll() { await sleep(1000); return [] } };

    const api = (<App api={fakeApi}/>);
    const { getByText } = render(api);

    await waitFor(() => getByText(/No productions/i));
});

test('Renders productions', async () => {
    // note: data integrity at this point is not important
    // @todo cover new fields with new tests
    const productions = [
        {
            Id: '1',
            Abstract: 'Abstract',
            AgeRating: '12',
            Cast: 'Ruby Rose, Rachel Skarsten, Meagan Tandy, Camrus Johnson, Nicole Kang',
            Category: 'SERIES',
            Director: 'Marcos Siega',
            Genre: 'akció',
            Name: 'Batwoman',
        },
        {
            Id: '2',
            Abstract: 'Dummer',
            AgeRating: '16',
            Cast: 'Tom Hanks',
            Category: 'MOVIE',
            Director: 'Tom Cruise',
            Genre: 'dráma',
            Name: 'Tom Hardy',
        }
    ];
    const fakeApi = { async getAll() { await sleep(100); return productions } };

    const api = (<App api={fakeApi}/>);
    const { getByText } = render(api);

    await waitFor(() => getByText(productions[0].Name));

    const displayedProperties = ['Abstract', 'AgeRating', 'Cast', 'Category', 'Director', 'Genre', 'Name'];
    productions.forEach(prod =>
        Object.entries(prod).filter(([allPropertyKeys, _]) => {
            return allPropertyKeys in displayedProperties;
        }).forEach(([_, expectedDisplayedValue]) => {
            getByText(expectedDisplayedValue);
        })
    );
});

test('Deleting a production removes it from the list', async () => {
    const productions = [
        {
            Id: '1',
            Abstract: 'Abstract',
            AgeRating: '12',
            Cast: 'Ruby Rose, Rachel Skarsten, Meagan Tandy, Camrus Johnson, Nicole Kang',
            Category: 'SERIES',
            Director: 'Marcos Siega',
            Genre: 'akció',
            Name: 'Batwoman',
        },
        {
            Id: '2',
            Abstract: 'Dummer',
            AgeRating: '16',
            Cast: 'Tom Hanks',
            Category: 'MOVIE',
            Director: 'Tom Cruise',
            Genre: 'dráma',
            Name: 'Tom Hardy',
        }
    ];
    const fakeApi = {
        async getAll() { await sleep(100); return productions },
        async delete(id) { await sleep(100); }
    };

    const api = (<App api={fakeApi}/>);
    const { getByTitle } = render(api);


    const deleteProduction = { ... productions[1] };
    await waitFor(() => getByTitle(`Delete ${deleteProduction.Name}`));
    fireEvent.click(getByTitle(`Delete ${deleteProduction.Name}`));
    expect(screen.queryByTitle(deleteProduction.Name)).toBeNull();
});

test('Can create new productions', async () => {
    const fakeApi = {
        async getAll() { await sleep(100); return [] },
    };
    const api = (<App api={fakeApi}/>);
    const { getByTitle, container } = render(api);

    await waitFor(() => getByTitle("Create new production"));

    const expectedProductionFields = ['Abstract', 'AgeRating', 'Cast', 'Category', 'Director', 'Genre', 'Name'];
    expectedProductionFields.forEach(field => {
        expect(queryByInputName(container, field)).toBeInTheDocument();
    });
});

test('Creating a production adds the production to the list, returned by api', async () => {
    const userFilledNewProduction = {
        Abstract: 'Abstract',
        AgeRating: '12',
        Cast: 'Ruby Rose, Rachel Skarsten, Meagan Tandy, Camrus Johnson, Nicole Kang',
        Category: 'SERIES',
        Director: 'Marcos Siega',
        Genre: 'akció',
        Name: 'Batwoman',
    };
    const expectedNewProduction = {
        Abstract: 'Nope',
        AgeRating: '16',
        Cast: 'Changed by api',
        Category: 'MOVIES',
        Director: 'Nar',
        Genre: 'dráma',
        Name: 'Batman',
    };

    const fakeApi = {
        async getAll() { await sleep(100); return [] },
        async create(production) {
            await sleep(100);
            return expectedNewProduction;
        },
    };


    const api = (<App api={fakeApi}/>);
    const { container, getByTitle, findByText, queryByText } = render(api);

    // fill form
    Object.entries(userFilledNewProduction).forEach(([key, value]) => {
        fireEvent.change(queryByInputName(container, key), {
            target: { value: value }
        });
    });
    // click submit
    fireEvent.click(getByTitle("Create new production"));

    await findByText(expectedNewProduction.Name);

    // assert
    Object.entries(expectedNewProduction).forEach(([key, value]) => {
        expect(queryByText(value)).toBeInTheDocument();
    });
});
