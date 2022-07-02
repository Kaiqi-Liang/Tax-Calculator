import React from 'react';
import { TextField,
  CssBaseline,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import TaxAmount from './components/TaxAmount';
import TaxCategory from './components/TaxCategory';
import UploadButton from './components/Upload';
import CalculateIcon from '@mui/icons-material/Calculate';

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
  border: '1px solid',
  padding: '20px',
});

const Output = styled('div')<OutputProps>(({ output } ) => ({
  display: output ? 'block' : 'none',
  border: '1px solid',
}));

function App() {
  const [salary, setSalary] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [checkbox, setCheckbox] = React.useState(false);
  const [output, setOutput] = React.useState(false);

  React.useEffect(() => {
    setOutput(false);
  }, [salary, tax, checkbox]);

  const onChangeHandler = (
      value: string,
      setState: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setState(parseFloat(value));
  };

  return (
    <Main>
      <CssBaseline />
      <Form>
        <TextField
          variant='outlined'
          value={salary}
          label='Fortnightly salary'
          type='number'
          onChange={({ target }) => onChangeHandler(target.value, setSalary)}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
          }
          label='Do you want to enter tax'
        />
        <TextField
          variant='outlined'
          value={tax}
          label='Tax'
          type='number'
          onChange={({ target }) => onChangeHandler(target.value, setTax)}
          disabled={!checkbox}
        />
        <UploadButton />
        <Button
          variant='contained'
          onClick={() => setOutput(true)}
          startIcon={<CalculateIcon />}
          endIcon={<CalculateIcon />}
        >
          Calculate
        </Button>
      </Form>
      <Output output={output}>
        {checkbox ?
          <TaxCategory salary={salary} tax={tax} /> :
          <TaxAmount salary={salary} />
        }
      </Output>
    </Main>
  );
}

export default App;
