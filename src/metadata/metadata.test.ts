import { parseMetadata } from './metadata';

describe('Metadata:', () => {
  it('should parse empty title', () => {
    expect(parseMetadata('{title}').title).toBeUndefined();
    expect(parseMetadata('{Title}').title).toBeUndefined();
  });

  it('should parse title with value', () => {
    expect(parseMetadata('{title: value:value}').title).toBe('value:value');
    expect(parseMetadata('{Title: value:value}').title).toBe('value:value');
  });

  it('should parse empty artist', () => {
    expect(parseMetadata('{artist}').artist).toBeUndefined();
    expect(parseMetadata('{Artist}').artist).toBeUndefined();
  });

  it('should parse title with value', () => {
    expect(parseMetadata('{artist: value:value}').artist).toBe('value:value');
    expect(parseMetadata('{Artist: value:value}').artist).toBe('value:value');
  });
});
