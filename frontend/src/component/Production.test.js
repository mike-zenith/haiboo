'use strict';

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Production from './Production';

afterEach(cleanup);

function findTextWithQuery(value, query) {
    try {
        return query((content, node) => {
            const hasText = node => node.textContent.trim() === value;
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
                child => !hasText(child)
            );

            return nodeHasText && childrenDontHaveText;
        });
    } catch (e) {
        console.error(`[findTextWithQuery] with value (${value}) : ${e}`);
        return false;
    }
}

test('renders production details', () => {
    const displayedProductionProperties = {
        Abstract: 'Abstract',
        AgeRating: '12',
        AvailabilityFromUtcIso: '2019-12-21T23:00:00Z',
        Cast: 'Ruby Rose, Rachel Skarsten, Meagan Tandy, Camrus Johnson, Nicole Kang',
        Category: 'SERIES',
        Director: 'Marcos Siega',
        EditedAbstract: 'Edited',
        Genre: 'akció',
        Name: 'Batwoman',
        ProductionYear: '2019'
    };
    const { container, getByText } = render(<Production production={displayedProductionProperties} />);
    expect(container).toBeInTheDocument();
    for(const [key, value] of Object.entries(displayedProductionProperties)) {
        expect(findTextWithQuery(value, getByText)).toBeTruthy();
    }
});

test('it renders production background image', () => {
    const production = {
        BackgroundUrl: 'http://hboce-preprod-vod-hss.akamaized.net/d44b68b6-9fa1-f93d-9a84-84b3a941dc98_p106585_hbo/images/30445957.jpg',
    };
    const { debug, container } = render(<Production production={production} />);
    const computedStyle = getComputedStyle(container.firstChild);
    expect(computedStyle.backgroundImage).toContain(production.BackgroundUrl);
})
