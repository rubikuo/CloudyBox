import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

//ska testa, om 3 länker renderas Home foo bar

describe('Header', () => {
    const location = {
        pathname: '/home/foo/bar'
    }

    function filterSearch() {

    }

    const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search='foo' />);
    const input = wrapper.find('input');

    it('should has the first class header-container', () => {
        expect(wrapper.hasClass('header-container')).toBe(true)
    });

    it('should have an image', () => {
        expect(wrapper.find('img')).toEqual({}); //img={logo}
    })

    it('should have a search field input', () => {
        input.simulate('focus');
        input.simulate('change', {target: {value: 'foo'}});
        //expect(input.get(0).value).toEqual('foo');
    });

    it('should have proper props for search field', () => {
        expect(input.props()).toHaveProperty('border', 'none');
        expect(input.props()).toBe({
            className: "search-input",
            //how to add attr here? style={{ border: 'none' }}
            type: 'text',
            placeholder: 'Search folder',
            name: 'search',
            id: 'search',
            onChange: {filterSearch},
            value: 'foo'
        });
    });


    it('should have a navigation', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    });

    it('should have the logout function on the button', () => {
        expect(wrapper.find('button')).toEqual({});
    });

});
