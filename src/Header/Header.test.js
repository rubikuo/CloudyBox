import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

//om onClick finns här, men funktionen i en andra komponent, hur ska det testas? där. inte här.
//hur kan man testa useEffect?

//ska testa, om 3 länker renderas 

describe('Header', () => {
    const location = {
        pathname: "/home/foo/bar"
    }

    function filterSearch() {

    }

    const wrapper = shallow(<Header location={location} filterSearch={filterSearch} search="foo" />);

    it('should has the first class header-container', () => {
        expect(wrapper.hasClass('header-container')).toBe(true)
    });

    it('should has a logo-search-container in the header-container', () => {
        expect(wrapper.find('div').hasClass('logo-search-container')).toBe(true);
    });

    it('should have a logo-container', () => {
        expect(wrapper.find('div').hasClass('logo-container')).toBe(true);
    });

    it('should have an image', () => {
        expect(wrapper.find('img')).toBe(true);
    })

    it('should have a search field input', () => {
        expect(wrapper.find('input[type=text]').length).toEqual(1);
    });

    it('should have proper props for search field', () => {
        const selector = 'search';
        expect(wrapper.find('input[type=text]').props()).toEqual({
            className: "search-input",
            type: 'text',
            placeholder: 'Search folder',
            name: 'search',
            id: 'search',
            onChange: expect.any(Function),
            value: expect.any(selector),
        });
    });

    it('should have a path-logout-container', () => {
        expect(wrapper.find('path-logout-container')).toBe(true);
    });

    it('should have a navigation', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    });

    it('should have a logout-button', () => {
        expect(wrapper.find('button').hasClass('logout-button')).toBe(true);
    });

});

//expect(wrapper.find('footer').exists()).toBe(true)