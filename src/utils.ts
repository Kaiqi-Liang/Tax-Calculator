type TaxScaleEntry = [number, number, number];

const scale1: TaxScaleEntry[] = [
  [0, 0.1900, 0.1900],
  [88, 0.2348, 3.9639],
  [371, 0.2190, -1.9003],
  [515, 0.3477, 64.4297],
  [932, 0.3450, 61.9132],
  [1957, 0.3900, 150.0093],
  [3111, 0.4700, 398.9324],
];

const scale2: TaxScaleEntry[] = [
  [0, 0.0000, 0.0000],
  [359, 0.1900, 68.3462],
  [438, 0.2900, 112.1942],
  [548, 0.2100, 68.3465],
  [721, 0.2190, 74.8369],
  [865, 0.3477, 186.2119],
  [1282, 0.3450, 182.7504],
  [2307, 0.3900, 286.5965],
  [3461, 0.4700, 563.5196],
];

const lookup = (salary: number, scale: TaxScaleEntry[]) => {
  const trunc = Math.trunc(salary / 2);
  const entry = scale.filter((bracket) => bracket[0] < trunc).pop();
  if (entry) {
    const [_, a, b] = entry;
    return Math.round((trunc + 0.99) * a - b) * 2;
  } else {
    return 0;
  }
};

type Category = 'No Tax Free Threshold' | 'Tax Free Threshold' | 'Non Resident';

const withinCategory = (
    category: (salary: number) => number): (salary: number, tax: number
) => boolean => {
  return (salary: number, tax: number) => Math.abs(tax - category(salary)) < 5;
};

export const findCategory = (salary: number, tax: number): Category => {
  if (withinCategory(calcTaxFreeThresholdTax)(salary, tax)) {
    return 'Tax Free Threshold';
  } else if (withinCategory(calcNoTaxFreeThresholdTax)(salary, tax)) {
    return 'No Tax Free Threshold';
  } else {
    return 'Non Resident';
  }
};

export const calcNonResidentTax = (salary: number) => {
  if (salary < 4613) {
    return Math.trunc(salary * 0.325);
  } else if (salary < 6921) {
    return Math.trunc(1499 + (salary - 4613) * 0.37);
  } else {
    return Math.trunc(2353 + (salary - 6921) * 0.37);
  }
};

export function calcNoTaxFreeThresholdTax(salary: number) {
  return lookup(salary, scale1);
}

export function calcTaxFreeThresholdTax(salary: number) {
  return lookup(salary, scale2);
}
