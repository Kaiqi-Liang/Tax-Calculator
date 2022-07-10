import { PayCycle } from './type';

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

const fornightly = (salary: number, scale: TaxScaleEntry[]) => {
  const trunc = Math.trunc(salary / 2);
  const entry = scale.filter((bracket) => bracket[0] < trunc).pop();
  if (entry) {
    const [_, a, b] = entry;
    return Math.round((trunc + 0.99) * a - b) * 2;
  } else {
    return 0;
  }
};

const weekly = (salary: number, scale: TaxScaleEntry[]) => {
  const trunc = Math.trunc(salary);
  const entry = scale.filter((bracket) => bracket[0] < trunc).pop();
  if (entry) {
    const [_, a, b] = entry;
    return Math.round((trunc + 0.99) * a - b);
  } else {
    return 0;
  }
};

const calcConversion = (payCycle: PayCycle) => {
  switch (payCycle) {
    case 'Annually':
      return 1;
    case 'Fornightly':
      return 26;
    case 'Weekly':
      return 52;
    default: {
      const _: never = payCycle;
      return 0;
    }
  }
};

export const calcNonResidentTax = (salary: number, payCycle: PayCycle = 'Fornightly') => {
  const conversion = calcConversion(payCycle);
  salary *= conversion;
  if (salary < 120000) {
    return Math.trunc(salary * 0.325 / conversion);
  } else if (salary < 180000) {
    return Math.trunc((120000 * 0.325 + (salary - 120000) * 0.37) / conversion);
  } else {
    return Math.trunc((61200 + (salary - 180000) * 0.45) / conversion);
  }
};

export const calcWorkingHolidayMakerTax = (salary: number, payCycle: PayCycle = 'Fornightly') => {
  const conversion = calcConversion(payCycle);
  salary *= conversion;
  if (salary < 45000) {
    return Math.trunc(salary * 0.15 / conversion);
  } else if (salary < 120000) {
    return Math.trunc((45000 * 0.15 + (salary - 45000) * 0.325) / conversion);
  } else if (salary < 180000) {
    return Math.trunc((31125 + (salary - 120000) * 0.37) / conversion);
  } else {
    return Math.trunc((53325 + (salary - 180000) * 0.45) / conversion);
  }
};

export function calcNoTaxFreeThresholdTax(salary: number, payCycle: PayCycle = 'Fornightly') {
  switch (payCycle) {
    case 'Annually': {
      const conversion = calcConversion(payCycle);
      salary *= conversion;
      if (salary < 45000) {
        return Math.trunc(salary * 0.19 / conversion);
      } else if (salary < 120000) {
        return Math.trunc((45000 * 0.19 + (salary - 45000) * 0.325) / conversion);
      } else if (salary < 180000) {
        return Math.trunc((32925 + (salary - 120000) * 0.37) / conversion);
      } else {
        return Math.trunc((55125 + (salary - 180000) * 0.45) / conversion);
      }
    }
    case 'Fornightly':
      return fornightly(salary, scale1);
    case 'Weekly':
      return weekly(salary, scale1);
    default: {
      const _: never = payCycle;
      return 0;
    }
  }
}

export function calcTaxFreeThresholdTax(salary: number, payCycle: PayCycle = 'Fornightly') {
  switch (payCycle) {
    case 'Annually': {
      const conversion = calcConversion(payCycle);
      salary *= conversion;
      if (salary < 18200) {
        return 0;
      } else if (salary < 45000) {
        return Math.trunc((salary - 18200) * 0.19 / conversion);
      } else if (salary < 120000) {
        return Math.trunc((5092 + (salary - 45000) * 0.325) / conversion);
      } else if (salary < 180000) {
        return Math.trunc((29467 + (salary - 120000) * 0.37) / conversion);
      } else {
        return Math.trunc((51667 + (salary - 180000) * 0.45) / conversion);
      }
    }
    case 'Fornightly':
      return fornightly(salary, scale2);
    case 'Weekly':
      return weekly(salary, scale2);
    default: {
      const _: never = payCycle;
      return 0;
    }
  }
}
