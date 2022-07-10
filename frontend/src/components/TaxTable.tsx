import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { TaxTableData, TaxTableDataRow } from '../type';

export default function TaxTable({ data } : { data : TaxTableData }) {
  const getIncomeDisplay = (row : TaxTableDataRow, prevRow?: TaxTableDataRow) => {
    if (prevRow) {
      if (row[0] === Infinity) return `Over $${prevRow[0]}`;
      return `$${prevRow[0]}-$${row[0]}`;
    }
    return `$${0}-$${row[0]}`;
  };

  const getTaxLiabilityDisplay = (row: TaxTableDataRow, prevRow?: TaxTableDataRow) => {
    if (prevRow) {
      return `$${row[1]} plus ${row[2] * 100}¢ for every $1 over ${prevRow[0]}`;
    }
    if (row[1] === 0 && row[2] === 0) return `Nil`;
    return `${row[2] * 100}¢ for every $1`;
  };

  const getTaxRateDisplay = (row: TaxTableDataRow) => `${row[2] * 100}%`;

  const rows = data.map((row, i) => {
    const income = getIncomeDisplay(row, data[i-1]);
    const taxLiability = getTaxLiabilityDisplay(row, data[i-1]);
    const taxRate = getTaxRateDisplay(row);
    return [income, taxLiability, taxRate];
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Income</TableCell>
            <TableCell align="center">Tax Liability</TableCell>
            <TableCell align="center">Tax Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row[0]}
              </TableCell>
              <TableCell align="center">{row[1]}</TableCell>
              <TableCell align="center">{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
