import { getValueFromDirective, matchesDirective } from './utils';

describe('Utils:', () => {
  it('extracts value from directive - empty', () => {
    expect(getValueFromDirective('{test}')).toBeUndefined();
    expect(getValueFromDirective('{test:}')).toBe('');
  });

  it('extracts value from directive - without :', () => {
    expect(getValueFromDirective('{test:value }')).toBe('value');
    expect(getValueFromDirective('{test: value}')).toBe('value');
    expect(getValueFromDirective('{test: value }')).toBe('value');
  });

  it('extracts value from directive - with :', () => {
    expect(getValueFromDirective('{test: :value:}')).toBe(':value:');
    expect(getValueFromDirective('{test::value:}')).toBe(':value:');
    expect(getValueFromDirective('{test: :value: }')).toBe(':value:');
  });

  it('matches directive', () => {
    expect(matchesDirective('title|Title', '{title}')).toBeTruthy();
    expect(matchesDirective('title|Title', '{Title}')).toBeTruthy();
  });

  it('matches directive with value', () => {
    expect(matchesDirective('title|Title', '{title:value}')).toBeTruthy();
    expect(matchesDirective('title|Title', '{Title:value}')).toBeTruthy();
  });
});
