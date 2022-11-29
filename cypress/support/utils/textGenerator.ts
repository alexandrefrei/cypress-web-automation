/* eslint-disable @typescript-eslint/no-var-requires */
import dayjs = require('dayjs');
const Chance = require('chance');

// Instantiate Chance so it can be used
export const CHANCE = new Chance();

export function generateNumber(min: number, max: number): string {
  return CHANCE.integer({ min: min, max: max }).toString();
}

export function generateFirstName(): string {
  return CHANCE.first();
}

export function generateLastName(): string {
  return CHANCE.last();
}
export function generatePostalCode(): string {
  return CHANCE.postcode();
}

export function generateAddress(): string {
  // TODO https://app.clubhouse.io/yieldstreet/story/61833/county-is-set-into-city-field-by-address-autocomplete
  const addresses: string[] = [
    '300 Park Avenue, New York, NY',
    '1531 Ferry Ave, Camden, NJ 08104',
  ];
  return CHANCE.pickone(addresses);
}

export function generateSSN(): string {
  return '222222222';
}

/**
 * @param format as per https://momentjs.com/
 * @returns random date more than 18 years ago formatted in given format
 */
export function generateDate(format = 'MM/DD/YYYY', random = true): string {
  if (random) {
    return dayjs()
      .subtract(CHANCE.integer({ min: 18, max: 99 }), 'years')
      .subtract(CHANCE.integer({ min: 1, max: 365 }), 'days')
      .format(format);
  } else return dayjs().format(format);
}
