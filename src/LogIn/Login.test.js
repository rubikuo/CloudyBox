import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Login from './LogIn';
import { token$ } from '../store';

describe('Login', () => {
	it('should have a token, if any', () => {
		//to fake the token with a getter function:
		const tokenStub = sinon.stub(token$, 'value').get(function() {
			return 'foo';
		});
		const wrapper = shallow(<Login />);

		expect(wrapper.find('Redirect').prop('to')).toBe('/home');
		tokenStub.restore();
	});

	it('should have a div container container-login', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find('div').hasClass('container-login')).toBe(true);
	});

	it('should have three images', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find('img').length).toEqual(3);
	});

	it('should have an <a> tag', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find('a').exists()).toBe(true);
	});
});
