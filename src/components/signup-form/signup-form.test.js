import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { shallow, mount } from 'enzyme';
import SignUp from './signup-form';

Enzyme.configure({adapter: new Adapter()});

test('renders the sign up component', () => {
  const wrapper = shallow(<SignUp />);
  expect(wrapper.find('#submitBtn').exists()).toBeTruthy();
  expect(wrapper.find('#resetBtn').exists()).toBeTruthy();
  expect(wrapper).toMatchSnapshot();
});

test('check form validations', () => {
    const wrapper = mount(<SignUp />);
    expect(wrapper.find('.text-input_fieldWrapper .errorMessage').exists()).toBeFalsy();
    const nameInput = wrapper.find('input#firstName');
    nameInput.simulate("change", { target: { value: "foo" }});
    const submitBtn = wrapper.find("#submitBtn");
    submitBtn.simulate('click');
});
  

