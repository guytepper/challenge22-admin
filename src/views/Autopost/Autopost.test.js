import React from 'react';
import { shallow } from 'enzyme';
import Autopost from './Autopost';

const groups = [
  { id: 1, name: 'Challenge 22 - August' },
  { id: 2, name: 'Challenge 22 - September' }
];

it('renders without crashing', () => {
  shallow(<Autopost groups={groups} />);
});

it('renders select group options', () => {
  const wrapper = shallow(<Autopost groups={groups} />);
  const Select = wrapper.find('Select');
  const Option = wrapper.find('Option');
  expect(Select).toHaveLength(1);
  expect(Option).toHaveLength(2);
});
