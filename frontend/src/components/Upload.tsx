import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack } from '@mui/material';
import Receipt from '@mui/icons-material/Receipt';
import { UploadFile } from '@mui/icons-material';
const SERVER_URL = 'https://tax-calculator-355806.ts.r.appspot.com/';

const Input = styled('input')({
  display: 'none',
});

function UploadButton({ setTax, setSalary }:
  {
    setTax: React.Dispatch<React.SetStateAction<string>>,
    setSalary: React.Dispatch<React.SetStateAction<string>>,
  },
) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
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
                else throw new Error('No pdf uploaded');
              }).then(({ tax, salary }) => {
                setTax(tax.toString());
                setSalary(salary.toString());
              }).catch((e) => console.warn(e));
            }
          }}
        />
        <IconButton>
          <UploadFile />
        </IconButton>
      </label>
    </Stack>
  );
}

export default UploadButton;
