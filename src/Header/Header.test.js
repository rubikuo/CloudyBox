import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Header from './Header';

describe('Header', () => {
	const location = {
		pathname: '/home/foo/bar'
	};
	function filterSearch() {}

	it('should has the first class header-container', () => {
		const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);

		expect(wrapper.hasClass('header-container')).toBe(true);
	});

	it('should have an image', () => {
		const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);

		expect(wrapper.find('img')).toEqual({}); //img={logo}
	});

	it('should have a search field input', () => {
		const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);
		const input = wrapper.find('input');

		input.simulate('focus');
		input.simulate('change', { target: { value: 'foo' } });
	});

	it('should have proper props for search field', () => {
		const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);
		const input = wrapper.find('input');

		expect(input.props()).toEqual({
			className: 'search-input',
			style: { border: 'none' },
			type: 'text',
			placeholder: 'Search folder',
			name: 'search',
			id: 'search',
			onChange: filterSearch,
			value: 'foo'
		});
	});

	it('should have a navigation', () => {
		const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);
		expect(wrapper.find('nav').length).toEqual(1);
	});

	it('should have the logout function on the button', () => {
		const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);
		expect(wrapper.find('button')).toEqual({});
	});

	it('should return the right breadcrumbs', () => {
		const wrapper = shallow(<Header location={location} />);
		const links = wrapper.find('nav Link');

		expect(links.length).toBe(3);
	});

	it('should call function on logout', () => {
		const logOutSpy = sinon.spy();
		const wrapper = shallow(
			<Header location={location} filterSearch={filterSearch} search="foo" logOut={logOutSpy} />
		);

		expect(logOutSpy.calledOnce).toBe(false);
		wrapper.find('.logout-button').simulate('click');
		expect(logOutSpy.calledOnce).toBe(true);
	});

	it('onChange should work correctly in input field', () => {
		const searchSpy = sinon.spy();
		const wrapper = shallow(<Header location={location} filterSearch={searchSpy} search="foo" />);

		wrapper.find('input').at(0).simulate('change', { target: { name: 'value', value: ' foo' } });
		expect(searchSpy.returned('foo'));
	});
});
