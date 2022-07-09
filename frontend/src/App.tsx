import React from 'react';
import {
  TextField,
  CssBaseline,
  Button,
  Box,
  Snackbar,
  IconButton,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import TaxAmount from './components/TaxAmount';
import TaxCategory from './components/TaxCategory';
import UploadButton from './components/Upload';
import CalculateIcon from '@mui/icons-material/Calculate';
import CloseIcon from '@mui/icons-material/Close';

type OutputProps = { output: boolean };
const Main = styled('div')({
  height: '100vh',
  width: '100vw',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '350px',
  padding: '20px',
});

const Input = styled(Box)({
  display: 'flex',
  gap: '1rem',
});

const Output = styled('div')<OutputProps>(({ output }) => ({
  display: output ? 'block' : 'none',
  border: '1px solid',
}));

function App() {
  const [salary, setSalary] = React.useState<string>('');
  const [tax, setTax] = React.useState<string>('');
  const [output, setOutput] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOutput(false);
  }, [salary, tax]);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setOpen(false);
  };

  const onChangeHandler = (
      input: string,
      setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (input === '') {
      setState('');
    } else if (!isNaN(parseFloat(input))) {
      setState(input);
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Main>
      <CssBaseline />
      <Form>
        <Input>
          <TextField
            variant='outlined'
            value={salary}
            label='Fortnightly salary'
            type='number'
            onChange={({ target }) => onChangeHandler(target.value, setSalary)}
          />
          <TextField
            variant='outlined'
            value={tax}
            label='Tax (optional)'
            type='number'
            onChange={({ target }) => onChangeHandler(target.value, setTax)}
          />
          <UploadButton
            setTax={setTax}
            setSalary={setSalary}
            setOpen={setOpen}
          />
        </Input>
        <Button
          variant='contained'
          onClick={() => setOutput(true)}
          startIcon={<CalculateIcon />}
          endIcon={<CalculateIcon />}
        >
          Calculate
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            severity='error'
            onClose={handleClose}
          >
          Payslip was not uploaded successfully
          </Alert>
        </Snackbar>
      </Form>
      <Output output={output}>
        {
          salary !== '' &&
          tax !== '' &&
          <TaxCategory salary={parseFloat(salary)} tax={parseFloat(tax)} />
        }
        {
          salary !== '' &&
          tax === '' &&
          <TaxAmount salary={parseFloat(salary)} />
        }
      </Output>
    </Main>
  );
}

export default App;
