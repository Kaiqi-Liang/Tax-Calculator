import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Receipt from '@mui/icons-material/Receipt';
import { PORT } from '../config';

const Input = styled('input')({
  display: 'none',
});

function UploadButton({ setTax, setSalary, setCheckbox }:
  {
    setTax: React.Dispatch<React.SetStateAction<number>>,
    setSalary: React.Dispatch<React.SetStateAction<number>>,
    setCheckbox: React.Dispatch<React.SetStateAction<boolean>>,
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
              fetch(`http://127.0.0.1:${PORT}`, {
                method: 'post',
                body: form,
              }).then((r) => r.json())
                  .then(({ tax, salary }) => {
                    setTax(tax);
                    setSalary(salary);
                    setCheckbox(true);
                  });
            }
          }}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<Receipt />}
          endIcon={<Receipt />}
        >
          Upload Paycheck
        </Button>
      </label>
    </Stack>
  );
}

export default UploadButton;
