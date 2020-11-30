import { mount } from 'enzyme';

import BasicInfo from '../components/restoprofile/BasicInfo';
import Gallery from '../components/restoprofile/Gallery';
import GalleryItem from '../components/restoprofile/GalleryItem';

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

/** @test {BasicInfo Component} */
describe('BasicInfo Component', () => {
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

        const wrapper = mount(<BasicInfo resto={testProps}/>);
        // Expect a Basic Info Component
        expect(wrapper.find(BasicInfo)).toHaveLength(1);
        wrapper.unmount();
    });
});

/** @test {Gallery Component} */
describe('Gallery Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<Gallery />);
        // Expect a Header
        expect(wrapper.find(Gallery)).toHaveLength(1);
        wrapper.unmount();
    });
});

/** @test {GalleryItem Component} */
describe('GalleryItem Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<Gallery />);
        // Expect a Header
        expect(wrapper.find(GalleryItem)).toHaveLength(7);
        wrapper.unmount();
    });
});