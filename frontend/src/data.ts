import { TaxCategory, TaxCategoryData } from './type';
import { calcTaxFreeThresholdTax, calcNoTaxFreeThresholdTax, calcNonResidentTax, calcWorkingHolidayMakerTax } from './utils';

export const taxCategories : TaxCategoryData[] = [
  {
    id: TaxCategory.TaxFreeThreshold,
    title: 'Tax Free Threshold',
    description: 'If you are an Australian resident for tax purposes for a full year, you pay no tax on the first $18,200 of your income. This is called the tax-free threshold.',
    link: 'https://www.ato.gov.au/Individuals/Ind/Tax-free-threshold-for-newcomers-to-Australia/',
    taxTable: [
      [18_200, 0, 0],
      [45_000, 0, 0.19],
      [120_000, 5092, 0.325],
      [180_000, 29467, 0.37],
      [Infinity, 51667, 0.45],
    ],
  },
  {
    id: TaxCategory.NoTaxFreeThreshold,
    title: 'No Tax Free Threshold',
    description: 'Claiming the tax-free threshold ($18,200) reduces the amount of tax withheld from your income. If you have more than one payers at the same time, generally you only claim the tax-free threshold from one payer so that payer will withhold tax from your income at a lower rate than the others.',
    link: 'https://www.ato.gov.au/Individuals/Jobs-and-employment-types/Working-as-an-employee/Income-from-more-than-one-job/',
    taxTable: [
      [45_000, 0, 0.19],
      [120_000, 8550, 0.325],
      [180_000, 32925, 0.37],
      [Infinity, 55125, 0.45],
    ],
  },
  {
    id: TaxCategory.NonResident,
    title: 'Non Resident',
    description: 'Essentially, this will affect how much tax you pay. Non-residents get taxed at a higher rate than residents in Australia. The main requirement to be deemed a resident for tax purposes is that you have continuously resided in Australia for a period of 183 days (6 months).',
    link: 'https://www.ato.gov.au/Individuals/Coming-to-Australia-or-going-overseas/Your-tax-residency/Australian-resident-for-tax-purposes/',
    taxTable: [
      [120_000, 0, 0.325],
      [180_000, 39000, 0.37],
      [Infinity, 61200, 0.45],
    ],
  },
  {
    id: TaxCategory.WorkingHolidayMaker,
    title: 'Working Holiday Maker',
    description: 'You are a WHM if you have a visa subclass of either 417 Working Holiday or 462 Work and Holiday (backpackers).',
    link: 'https://www.ato.gov.au/Individuals/coming-to-australia-or-going-overseas/coming-to-australia/working-holiday-makers/',
    taxTable: [
      [45_000, 0, 0.15],
      [120_000, 6750, 0.325],
      [180_000, 31125, 0.37],
      [Infinity, 53325, 0.45],
    ],
  },
];
