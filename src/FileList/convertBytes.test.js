import { convertBytes } from './convertBytes';

describe('convertBytes', () => {
  it('convertBytes should return KB if bytes', () => {
    const inputSize = 7149;
    const convertedSize = '7.0 KB';

    expect(convertBytes(inputSize)).toBe(convertedSize);
  })
})
