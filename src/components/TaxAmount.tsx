import React from 'react';
import { Typography } from '@mui/material';
import {
  calcNoTaxFreeThresholdTax,
  calcTaxFreeThresholdTax,
  calcNonResidentTax,
} from '../utils';

function TaxAmount({ salary } : { salary: number }) {
  return (
    <>
      <Typography>
        {`Tax Free Threshold ${calcTaxFreeThresholdTax(salary)}`}
      </Typography>
      <Typography>
        {`No Tax Free Threshold ${calcNoTaxFreeThresholdTax(salary)}`}
      </Typography>
      <Typography>
        {`Non Resident ${calcNonResidentTax(salary)}`}
      </Typography>
    </>
  );
}

export default TaxAmount;
