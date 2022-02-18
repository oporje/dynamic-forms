import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { shallow, mount } from 'enzyme';
import TextInput from './text-input';

Enzyme.configure({adapter: new Adapter()});

test('renders the input component with given props (type = email)', () => {
  
  const fieldsVal = { 
      component: "TextInput",
      label: "Email",
      name: "email",
      type: "email",
      value: "",
  };

  const wrapper = shallow(<TextInput key={'email'} field={fieldsVal} validFields={null} errorMessages={'test'} setValue={() => {}} />);
  expect(wrapper.find('.label-input').exists()).toBeTruthy();
  expect(wrapper.find('input[type="email"]').exists()).toBeTruthy();
  expect(wrapper.find('.errorMessage').exists()).toBeFalsy();
});

test('renders the input component with error when error message is passed', () => {
  const fieldsVal = { 
    component: "TextInput",
    label: "Email",
    name: "email",
    type: "email",
    value: "",
  };

  const wrapper = mount(<TextInput key={'email'} field={fieldsVal} validFields={ {isRequiredCheck : false } } errorMessages={'test'} setValue={() => {}} />);
  expect(wrapper.find('.errorMessage').exists()).toBeTruthy();
});
  

