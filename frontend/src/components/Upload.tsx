import React from 'react';
import {
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Receipt } from '@mui/icons-material';
import { PayCycle } from '../type';
const SERVER_URL = 'https://tax-calculator-355806.ts.r.appspot.com/';

const Input = styled('input')({
  display: 'none',
});

function UploadButton({
  mobile,
  setTax,
  setSalary,
  setPayCycle,
  setOpenUploading,
  setOpenError,
  setOpenSuccess,
}:
  {
    mobile: boolean,
    setTax: React.Dispatch<React.SetStateAction<string>>,
    setSalary: React.Dispatch<React.SetStateAction<string>>,
    setPayCycle: React.Dispatch<React.SetStateAction<PayCycle>>,
    setOpenUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenError: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  },
) {
  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={2}
      sx={{ width: '100%' }}>
      <label htmlFor='contained-button-file' style={{ width: '100%' }}>
        <Input
          accept='.pdf'
          id='contained-button-file'
          type='file'
          onChange={({ target }) => {
            setOpenError(false);
            setOpenSuccess(false);
            setOpenUploading(true);
            const files = target.files;
            if (files) {
              const form = new FormData();
              form.append('pdf', files[0]);
              fetch(SERVER_URL, {
                method: 'post',
                body: form,
              }).then((r) => {
                if (r.ok) return r.json();
                else throw new Error();
              }).then(({ tax, salary }) => {
                setTax(tax.toString());
                setSalary(salary.toString());
                setPayCycle('Fornightly');
                setOpenUploading(false);
                setOpenError(false);
                setOpenSuccess(true);
              }).catch(() => {
                setOpenError(true);
                setOpenUploading(false);
              });
            }
          }}
        />
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          component='span'
          startIcon={<Receipt />}
          endIcon={<Receipt />}
          size='large'
        >
          { `Upload ${mobile ? '' : 'Payslip'}` }
        </Button>
      </label>
    </Stack>
  );
}

export default UploadButton;
