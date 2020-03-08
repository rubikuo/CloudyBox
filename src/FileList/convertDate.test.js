import { convertDate } from './convertDate';

//2020-02-26T04:27:35Z   <- isoDate
//2/26/2020              <- should return this: dateString

describe('convertDate', () => {
    it('should return date like this 2/26/2020', () => {
    
        const isoDate = '2020-02-26T04:27:35Z';
        const dateString = '2/26/2020';
        
        expect(convertDate(isoDate)).toBe(dateString);
    });
});
