'use strict';

import React from 'react';
import Production from './Production';
import styled from 'styled-components';

const DeleteButton = styled.button`
`;

function Productions({ productions, deleteProduction = () => {} }) {
    let productionOutput = '';
    if (productions && productions.length) {
       productionOutput = (
           <ul>
               {productions.map(prod => (
               <li key={prod.Id}>
                   <Production production={prod}/>
                   <DeleteButton title={`Delete ${prod.Name}`} onClick={() => deleteProduction(prod.Id)}>x</DeleteButton>
               </li>
               ))}
           </ul>
       )
    } else {
        productionOutput = (
            <span>No productions found</span>
        )
    }

    return (
        <div className='productions'>
            <h3>Productions</h3>
            {productionOutput}
        </div>
    );
}

export default Productions;
