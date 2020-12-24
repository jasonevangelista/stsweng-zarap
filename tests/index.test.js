import { mount } from 'enzyme';

import { Empty } from 'antd';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CarouselItem from '../components/CarouselItem';
import RegisterModal from '../components/RegisterModal';

import SearchRestoCard, { FormatDetails } from '../components/searchfilter/SearchRestoCard';
import BasicInfo from '../components/restoprofile/BasicInfo';
import Gallery from '../components/restoprofile/Gallery';
import GalleryItem from '../components/restoprofile/GalleryItem';
import ImageHeader from '../components/restoprofile/ImageHeader';
import ReviewCard from '../components/restoprofile/ReviewCard';
import Reviews, { countReviews, checkReviews } from '../components/restoprofile/Reviews';

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
    wrapper.unmount();
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
    wrapper.unmount();
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

    const wrapper = mount(<BasicInfo resto={testProps} />);
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

// /** @test {GalleryItem Component} */
// describe('GalleryItem Component', () => {
//     it('should render without crashing', () => {
//         const wrapper = mount(<Gallery />);
//         // Expect a Header
//         expect(wrapper.find(GalleryItem)).toHaveLength(7);
//         wrapper.unmount();
//     });
// });

// TODO: Update test to support props
/** @test {ImageHeader Component}  */
describe('ImageHeader Component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<ImageHeader />);
    // Expect an ImageHeader component
    expect(wrapper.find(ImageHeader)).toHaveLength(1);
    wrapper.unmount();
  });
});

// TODO: Update test to support props
/** @test {ReviewCard Component} */
describe('ReviewCard Component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<ReviewCard />);
    // Expect a ReviewCard component
    expect(wrapper.find(ReviewCard)).toHaveLength(1);
    wrapper.unmount();
  });
});

// TODO: Update test to support props
/** @test {ReviewCard Component} */
describe('Review Component', () => {
  it('should render without crashing', () => {
    // TODO update test props
    const testProps = [{ reviewId: 1 }, { reviewId: 2 }];
    const wrapper = mount(<Reviews reviews={testProps} />);
    // Expect a Review component
    expect(wrapper.find(Reviews)).toHaveLength(1);
    wrapper.unmount();
  });
});

/** @test {countReviews Function in ReviewCard} */
describe('countReviews Function', () => {
  it('If list of null reviews, should output length 1', () => {
    const reviews = [null, null, null];
    // Expect it to output 1
    expect(countReviews(reviews)).toEqual(1);
  });

  it('If list of reviews, should output length n+1', () => {
    const reviews = [{ id: 2 }, { id: 3 }, { id: 1 }];
    // Expect it to output n+1
    expect(countReviews(reviews)).toEqual(reviews.length + 1);
  });
});

/** @test {checkReviews Function in ReviewCard} */
describe('checkReviews Function', () => {
  it('If null reviews, then output an Empty component', () => {
    const reviews = [null];
    const output = <Empty description="There are no reviews for this restaurant." />;
    // Expect it to output an Empty component
    expect(checkReviews(reviews)).toEqual(output);
  });

  // TODO: Update test case when checkReviews is completed
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

    const wrapper = mount(<BasicInfo resto={testProps} />);
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

/** @test {RegisterModal Component} */
describe('RegisterModal Component', () => {
  let wrapper;
  // const onFinish = jest.fn().mockImplementation(() => console.log('Form submitted!'));
  const onFinish = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <RegisterModal
        registerModalVisible={true}
        handleCancel={jest.fn()}
        redirectToLoginModal={jest.fn()}
        onFinish={onFinish}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render without crashing', () => {
    // Expect a RegisterModal
    expect(wrapper.find(RegisterModal)).toHaveLength(1);
  });

  it('should have proper input fields', () => {
    var receivedNamesList = wrapper
      .find(RegisterModal)
      .find('form')
      .children()
      .map((node) => node.props().name);
    const expectedNamesList = ['firstName', 'lastName', 'email', 'password', 'confirm'];
    expect(receivedNamesList).toEqual(expect.arrayContaining(expectedNamesList));
  });
});

/** @test {Register Modal Inputs} */
describe('Register Modal Inputs',  () => {
  let wrapper;
  const mockOnFinish = jest.fn()
  const defaultProps = {
    registerModalVisible: true,
    handleCancel: jest.fn(),
    redirectToLoginModal: jest.fn(),
    onFinish: mockOnFinish
  }
    
  beforeEach(() => {
    wrapper = mount(<RegisterModal {...defaultProps}/>);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  function tick() {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    })
  }

  // VALID INPUT PASS
  
  it('if valid inputs, form should submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(1);
  });

  // FIRST NAME VALIDATION CHECK

  it('if firstName is blank, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: '',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  it('if firstName is full of whitespace, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: '    ',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  // LAST NAME VALIDATION CHECK

  it('if lastName is blank, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: '',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  it('if lastName is full of whitespace, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: '   ',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  // E-MAIL VALIDATION CHECK

  it('if email has invalid format, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'ThisIsNotAValidEmail',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  it('if email has already been previously registered, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password123'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  // PASSWORD VALIDATION CHECK

  it('if password is not alphanumeric, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'password',
      confirm: 'password'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  it('if password is less than 6 characters, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'pw1',
      confirm: 'pw1'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

  it('if confirm password does not match password, form should not submit', async () => {
    // test data
    const testInput = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      password: 'password123',
      confirm: 'password456'
    };
    // place inputs in wrapper
    wrapper.find('input#firstName').simulate('change', { target: { value: testInput.firstName } });
    wrapper.find('input#lastName').simulate('change', { target: { value: testInput.lastName } });
    wrapper.find('input#email').simulate('change', { target: { value: testInput.email } });
    wrapper.find('input#password').simulate('change', { target: { value: testInput.password } });
    wrapper.find('input#confirm').simulate('change', { target: { value: testInput.confirm } });
    // submit form
    wrapper.find('form').simulate('submit')
    // wait for all validation checks to finish
    await tick();
    // mockOnFinish method should be called
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });

});