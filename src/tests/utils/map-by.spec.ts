import { mapBy } from '../../utils/map-by';

describe('mapBy function tests', () => {
  it('should map a iterable by property correctly', () => {
    const animals = [
      { name: 'Cat', createdAt: new Date() },
      { name: 'Dog', createdAt: new Date() },
      { name: 'Macaw', createdAt: new Date() },
    ];

    const animalsMappedByName = mapBy(animals, 'name');

    expect(animalsMappedByName).toBeInstanceOf(Map);
    expect(animalsMappedByName.size).toBe(3);
    expect(animalsMappedByName.get('Cat')).toBe(animals[0]);
    expect(animalsMappedByName.get('Dog')).toBe(animals[1]);
    expect(animalsMappedByName.get('Macaw')).toBe(animals[2]);
  });

  it('should replace value if key is repeated and keep size', () => {
    const animals = [
      { name: 'Cat', createdAt: new Date() },
      { name: 'Dog', createdAt: new Date() },
      { name: 'Macaw', createdAt: new Date() },
      { name: 'Cat', createdAt: new Date() },
    ];

    const animalsMappedByName = mapBy(animals, 'name');

    expect(animalsMappedByName.size).toBe(3);
    expect(animalsMappedByName.get('Cat')).not.toBe(animals[0]);
    expect(animalsMappedByName.get('Cat')).toBe(animals[3]);
  });
});
