import { mount } from 'enzyme';

import Footer from '../components/Footer';
import Header from '../components/Header';
import CarouselItem from '../components/CarouselItem';
import SearchRestoCard, { FormatDetails } from '../components/searchfilter/SearchRestoCard';

// mock window.matchMedia() method which is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

/** @test {Header Component} */
describe('Header Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<Header />);
        // Expect a Header
        expect(wrapper.find(Header)).toHaveLength(1);
        wrapper.unmount();
    });
});

/** @test {Footer Component} */
describe('Footer Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<Footer />);
        // Expect a Footer
        expect(wrapper.find(Footer)).toHaveLength(1);
        wrapper.unmount();
    });
});

/** @test {SearchRestoCard Component} */
describe('SearchRestoCard Component', () => {
    it('should render without crashing', () => {
        const testProps = {
            name: 'Golden Fortune',
            establishmentType: 'Casual Dining',
            city: 'Manila',
            fullAddress: '678 T.M. Kalaw Avenue, Ermita, Manila',
            cuisineType: ['Seafood', 'Chinese'],
            averageCost: 800,
            openHours: ['11:00 AM-2:30 PM (Mon-Sat)', '5:30 PM-12:AM (Sun)'],
            contactDetails: ['02 85222288', '02 85222288'],
            averageRating: 3.9,
            reviews: []
        };

        const wrapper = mount(<SearchRestoCard resto={testProps}></SearchRestoCard>);
        // Expect a SearchFilterCard
        expect(wrapper.find(SearchRestoCard)).toHaveLength(1);
    });
});

/** @test {CarouselItem Component} */
describe('CarouselItem Component', () => {
    it('should render without crashing', () => {
        const testProps = [
            {
                name: 'Golden Fortune',
                establishmentType: 'Casual Dining',
                city: 'Manila',
                fullAddress: '678 T.M. Kalaw Avenue, Ermita, Manila',
                cuisineType: ['Seafood', 'Chinese'],
                averageCost: 800,
                openHours: ['11:00 AM-2:30 PM (Mon-Sat)', '5:30 PM-12:AM (Sun)'],
                contactDetails: ['02 85222288', '02 85222288'],
                averageRating: 3.9,
                reviews: []
            },
            {
                name: 'Golden Fortune',
                establishmentType: 'Casual Dining',
                city: 'Manila',
                fullAddress: '678 T.M. Kalaw Avenue, Ermita, Manila',
                cuisineType: ['Seafood', 'Chinese'],
                averageCost: 800,
                openHours: ['11:00 AM-2:30 PM (Mon-Sat)', '5:30 PM-12:AM (Sun)'],
                contactDetails: ['02 85222288', '02 85222288'],
                averageRating: 3.9,
                reviews: []
            },
            {
                name: 'Golden Fortune',
                establishmentType: 'Casual Dining',
                city: 'Manila',
                fullAddress: '678 T.M. Kalaw Avenue, Ermita, Manila',
                cuisineType: ['Seafood', 'Chinese'],
                averageCost: 800,
                openHours: ['11:00 AM-2:30 PM (Mon-Sat)', '5:30 PM-12:AM (Sun)'],
                contactDetails: ['02 85222288', '02 85222288'],
                averageRating: 3.9,
                reviews: []
            }
        ];

        const wrapper = mount(<CarouselItem restoSet={testProps} />);
        // Expect a CarouselItem
        expect(wrapper.find(CarouselItem)).toHaveLength(1);
    });
});

/** @test {FormatDetails Function in SearchFilterCard} */
describe('FormatDetails Function', () => {
    it('If more than 1 detail in list, should insert symbol in between details', () => {
        const details = ['detail1', 'detail2'];
        const symbol = ', ';
        const expectedResult = details[0] + symbol + details[1];

        expect(FormatDetails(details, symbol)).toEqual(<p>{expectedResult}</p>);
    });
    it('If only 1 detail in list, should not have a symbol after detail', () => {
        const details = ['detail1'];
        const symbol = ', ';
        const expectedResult = details[0];
        expect(FormatDetails(details, symbol)).toEqual(<p>{expectedResult}</p>);
    });
});
