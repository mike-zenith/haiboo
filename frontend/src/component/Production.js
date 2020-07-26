'use strict';

import React from 'react';
import styled from 'styled-components';

const Availability = styled.div`
`;

const Title = styled.div`
`;

const Category = styled.div`
`;

const EditedAbstract = styled.div`
`;

const Abstract = styled.div`
`;

const Genre = styled.div`
`;

const Cast = styled.div`
`;

const Director = styled.div`
`;

const AgeRating = styled.div`
`;

const ProductionYear = styled.div`
`;

function Production({ production = {} }) {
    const backgroundStyle = production.BackgroundUrl
        ? { style: { background: `url('${production.BackgroundUrl}') no-repeat 50%` } }
        : {};
    return (
        <article { ... backgroundStyle }>
            <Title>{production.Name}</Title>
            <ProductionYear>{production.ProductionYear}</ProductionYear>
            <Category>{production.Category}</Category>
            <AgeRating>{production.AgeRating}</AgeRating>
            <Availability>{production.AvailabilityFromUtcIso}</Availability>
            <Director>{production.Director}</Director>
            <Cast>{production.Cast}</Cast>
            <Genre>{production.Genre}</Genre>
            <Abstract>
                {production.Abstract}
            </Abstract>
            <EditedAbstract>
                {production.EditedAbstract}
            </EditedAbstract>
        </article>
    )
}

export default Production;
