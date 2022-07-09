import React from 'react';
import { Typography } from '@mui/material';
import { findCategory } from '../utils';

function TaxCategory({ salary, tax }: { salary: number, tax: number }) {
  return (
    <>
      <Typography>{findCategory(salary, tax)}</Typography>
    </>
  );
}

export default TaxCategory;
