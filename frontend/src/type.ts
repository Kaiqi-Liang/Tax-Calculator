export type PayCycle = 'Annually' | 'Fornightly' | 'Weekly';

export enum TaxCategory {
  TaxFreeThreshold = 'taxFreeThreshold',
  NoTaxFreeThreshold = 'noTaxFreeThreshold',
  NonResident = 'nonResident',
  WorkingHolidayMaker = 'workingHolidayMaker',
}

export type TaxTableDataRow = [number, number, number];

export type TaxTableData = TaxTableDataRow[];

export interface TaxCategoryData {
  id: TaxCategory,
  title: string,
  description: string,
  link: string,
  taxTable: TaxTableData,
}
