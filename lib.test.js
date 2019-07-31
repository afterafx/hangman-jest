const readLineSync = require('readline-sync');
const { stringify, createBlankWordArray, isWordSolved, print, randomlySelectWord, askForALetter } = require('./lib');

describe('stringify', () => {
  it('should convert an arbitrary string array to a string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('hello');
  });

  it('should maintain case', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('Hello');
  });

  it('should maintain white-space', () => {
    const stringArray = 'Hello world'.split('');
    const result = stringify(stringArray);

    expect(result).toBe('Hello world');
  });

  it('should return empty string when given an empty array', () => {
    expect(stringify([])).toBe('');
  });

  it('should properly handle array entries with multiple entries', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('Hello');
  });

  it('should handle no input', () => {
    expect(stringify()).toBe('');
  });
});

describe('createBlackWordArray', () => {
  it('should return an array of arbitary length full of underscores', () => {
    const result = createBlankWordArray(10);
    // test length
    expect(result.length).toBe(10);
    expect(result).toHaveLength(10);
    // if they are actually all underscores
    expect(result).toEqual(['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']);
    expect(result.every(letter => letter === '_')).toBeTruthy();
  });

  it('should return an emty array when passed a length of 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
  });

  it('should gracefully handle undefined input', () => {
    const result = createBlankWordArray();
    expect(result).toHaveLength(0);
  });

  it('should return empty array on non number inputs', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
    expect(createBlankWordArray({})).toHaveLength(0);
    expect(createBlankWordArray(true)).toHaveLength(0);
  });
});

describe('isWordSolved', () => {
  it('should return flse if there are at least one underscore', () => {
    const input = 'a_b'.split('');
    const result = isWordSolved(input);
    expect(result).toBeFalsy();
  });

  it('should return if there are no underscores', () => {
    const input = 'abc'.split('');
    const result = isWordSolved(input);
    expect(result).toBeTruthy();
  });

  it('should throw a TypeError error if passed undefined input', () => {
    // try {
    //   isWordSolved(['a']);
    // } catch (error) {
    //   expect(error).toBeInstanceOf(TypeError);
    // }
    expect(() => isWordSolved()).toThrow(TypeError);
  });
});

describe('print', () => {
  it('should log output to the console', () => {
    console.log = jest.fn(); // mock the console.log statement
    print('Some input');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('Some input');

    console.log.mockClear(); // clear the mock state
  });

  it('should  output an empty string to the console', () => {
    print('');
    expect(console.log).toBeCalledWith('');
  });
});

describe('randomlySelectWord', () => {
  Math.random = jest.fn().mockReturnValue(0.5);

  it('should return the middle word', () => {
    const result = randomlySelectWord(['first', 'second', 'third']);
    expect(result).toBe('second');
  });

  it('should be able to return any word in the array', () => {
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);

    const firstResult = randomlySelectWord(['first', 'second', 'third']);
    const secondResult = randomlySelectWord(['first', 'second', 'third']);
    const thirdResult = randomlySelectWord(['first', 'second', 'third']);

    expect(firstResult).toBe('first');
    expect(secondResult).toBe('second');
    expect(thirdResult).toBe('third');
  });
});

jest.mock('readline-sync');
describe('askForALetter', () => {
  it('should return the letter that the user input', () => {
    readLineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});
