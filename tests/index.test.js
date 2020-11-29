import { mount } from 'enzyme';

import Footer from '../components/Footer';

/** @test {Footer Component} */
describe('Footer Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<Footer />);
        // Expect a Footer
        expect(wrapper.find('footer')).toHaveLength(1);
    });
});
