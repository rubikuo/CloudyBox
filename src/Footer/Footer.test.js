import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
	it('should have a footer tag', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper.find('footer').exists()).toBe(true);
	});

	it('should have a paragraph', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper.find('p').exists()).toBe(true);
	});

	it('should have a href', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper.find('a').exists()).toBe(true);
	});
});
