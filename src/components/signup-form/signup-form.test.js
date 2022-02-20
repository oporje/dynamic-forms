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

test('check if dynamic form is rendered as per the input json', () => {
  const wrapper = mount(<SignUp />);
  expect(wrapper.find('input#firstName').exists()).toBeTruthy();
  expect(wrapper.find('input#lastName').exists()).toBeTruthy();
  expect(wrapper.find('input#email').exists()).toBeTruthy();
  expect(wrapper.find('input#email1').exists()).toBeTruthy();
  expect(wrapper.find('input#password').exists()).toBeTruthy();
});

test('check error message is displayed when all required fields are not provided on form submit', () => {
    const wrapper = mount(<SignUp />);
    expect(wrapper.find('.text-input_fieldWrapper .errorMessage').exists()).toBeFalsy();
    const nameInput = wrapper.find('input#firstName');
    nameInput.simulate("change", { target: { value: "foo" }});
    const form = wrapper.find('form').first();
    form.simulate('submit');
    expect(wrapper.find('.errorMessage').exists()).toBeTruthy();
});
  

