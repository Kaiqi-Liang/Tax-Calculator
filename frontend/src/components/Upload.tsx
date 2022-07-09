import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Stack } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import Receipt from '@mui/icons-material/Receipt';
const SERVER_URL = 'https://tax-calculator-355806.ts.r.appspot.com/';

const Input = styled('input')({
  display: 'none',
});

function UploadButton({ setTax, setSalary, setOpen }:
  {
    setTax: React.Dispatch<React.SetStateAction<string>>,
    setSalary: React.Dispatch<React.SetStateAction<string>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  },
) {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
      <label htmlFor="contained-button-file" style={{ width: '100%' }}>
        <Input
          accept=".pdf"
          id="contained-button-file"
          type="file"
          onChange={({ target }) => {
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
                setOpen(false);
              }).catch(() => setOpen(true));
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color='secondary'
          component="span"
          startIcon={<Receipt />}
          endIcon={<Receipt />}
        >
          Upload Payslip
        </Button>
      </label>
    </Stack>
  );
}

export default UploadButton;
