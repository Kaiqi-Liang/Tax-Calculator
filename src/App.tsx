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

const Main = styled('div')({
  height: '100vh',
  width: '100vw',
  margin: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled('div')({
  display: 'flex',
  gap: '1rem',
});

type OutputProps = { output: boolean };
const Output = styled('div')<OutputProps>(({ output } ) => ({
  display: output ? 'block' : 'none',
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
        <Input>
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
            value={salary}
            label='Fortnightly salary'
            type='number'
            onChange={({ target }) => onChangeHandler(target.value, setSalary)}
          />
          <TextField
            variant='outlined'
            value={tax}
            label='Tax'
            type='number'
            onChange={({ target }) => onChangeHandler(target.value, setTax)}
            disabled={!checkbox}
          />
          <Button
            variant='contained'
            onClick={() => setOutput(true)}
          >
            Submit
          </Button>
        </Input>
        <Output output={output}>
          {checkbox ?
            <TaxCategory salary={salary} tax={tax} /> :
            <TaxAmount salary={salary} />
          }
        </Output>
      </Form>
    </Main>
  );
}

export default App;
