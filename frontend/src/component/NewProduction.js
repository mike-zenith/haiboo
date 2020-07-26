'use strict';

import React, {useState} from 'react';
import { uuid } from 'uuidv4';
import styled from 'styled-components';

const Input = styled.input`
`;

const CreateNewButton = styled.button`
`;

export default function NewProduction({ createProduction }) {
    const defaultProduction = {
        Abstract: '',
        AgeRating: '',
        Cast: '',
        Category: '',
        Director: '',
        Genre: '',
        Name: ''
    };
    const [production, setProduction] = useState({ ... defaultProduction });

    const newProduction = () => {
        // @todo loading, reset form
        createProduction({ ... production, Id: uuid() });
    }

    const onInputChange = (event) => {
        const target = event.target;
        const value = target.name;
        const name = target.value;

        setProduction(prev => ({
            ... prev, [name] : value
        }));
    }

    // @todo use proper input fields
    // @todo placeholders
    return (
        <form>
            {Object.entries(production).map(([field, value]) => (
                <Input key={field} name={field} type="text" value={value} onChange={onInputChange} />
            ))}
            <CreateNewButton title="Create new production" onClick={newProduction}>(+)</CreateNewButton>
        </form>
    )
}
