import { getOptionsOrPipes } from '../../utils/get-options-and-pipes';
import { PipeTransform } from '@nestjs/common';

describe('Get options or pipes function tests', () => {
  const options = { name: 'Cat', description: 'A pretty orange kitten' };
  class TestPipe implements PipeTransform {
    transform(value: any) {
      return value;
    }
  }

  it('should get options and empty array of pipes', () => {
    const { options: extractedOptions, pipes } = getOptionsOrPipes(options);

    expect(extractedOptions).toEqual(options);
    expect(Array.isArray(pipes)).toBe(true);
    expect(pipes).toHaveLength(0);
  });

  it('should get pipes and default options values', () => {
    const { options, pipes } = getOptionsOrPipes(TestPipe);

    expect(Array.isArray(pipes)).toBeTruthy();
    expect(pipes).toHaveLength(1);
    expect(pipes[0]).toBe(TestPipe);
    expect(options.name).toBe('filters');
    expect(options.description).toBeFalsy();
  });

  it('should get options and pipes', () => {
    const { options: extractedOptions, pipes } = getOptionsOrPipes(
      options,
      TestPipe,
    );

    expect(extractedOptions).toEqual(options);
    expect(Array.isArray(pipes)).toBeTruthy();
    expect(pipes).toHaveLength(1);
    expect(pipes[0]).toBe(TestPipe);
  });
});
