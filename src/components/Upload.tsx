import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Receipt from '@mui/icons-material/Receipt';

const Input = styled('input')({
  display: 'none',
});

function UploadButton() {
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
              const reader = new FileReader();
              reader.onload = (data) => {
                console.log(data);
              };
              reader.readAsArrayBuffer(files[0]);
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
