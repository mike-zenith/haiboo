'use strict';

import React, {useEffect, useState} from 'react';

import WithLoader from './component/WithLoader';
import Productions from './component/Productions';
import NewProduction from './component/NewProduction';
import {HourGlass} from 'react-awesome-spinners';

function App({ api }) {
    const WithProductionsLoader = WithLoader(Productions, HourGlass);
    const [prodLoading, setProdLoading] = useState(false);
    const [productions, setProductions] = useState([]);

    useEffect(() => {
        setProdLoading(true);
        // @todo error handling
        // @todo there should be a way to interrupt loading to avoid memory leaks
        (async () => {
            const productions = await api.getAll();
            setProductions(productions);
            setProdLoading(false);
        })();
    }, [prodLoading]);

    const onDeleteProduction = (id) => {
        // @todo error handling
        // @todo waiting for api is not needed, client can handle it as long as we dont need error handling
        setProductions(prods => prods.filter(prod => prod.Id !== id));
        api.delete(id);
    }

    const onCreateProduction = (production) => {
        // @todo loading state
        // @todo error-handling and displaying
        (async (production) => {
            const newProduction = await api.create(production);
            setProductions(prods => [... prods, newProduction ]);
        })(production);
    };

    return (
        <div className='App'>
            <WithProductionsLoader isLoading={prodLoading} productions={productions} deleteProduction={onDeleteProduction}/>
            <NewProduction createProduction={onCreateProduction} />
        </div>
    );
}

export default App;
