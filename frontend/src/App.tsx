import React from 'react';
import {
  TextField,
  CssBaseline,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/system';
import CalculateIcon from '@mui/icons-material/Calculate';
import {
  calcNoTaxFreeThresholdTax,
  calcTaxFreeThresholdTax,
  calcNonResidentTax,
  calcWorkingHolidayMakerTax,
} from './utils';
import CategoryCard from './components/CategoryCard';
import UploadButton from './components/Upload';
import {
  PayCycle,
  TaxCategory,
} from './type';
import { taxCategories } from './data';

const Main = styled('main')({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 1rem 1rem',
});

const Form = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '12rem',
  marginBottom: '3rem',
  columnGap: '1rem',
  rowGap: '1rem',
});

const CardContainer = styled(Box)({
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '1rem',
  '@media (min-width: 800px)': {
    flexDirection: 'row',
  },
});

const CardColumn = styled(Box)({
  'display': 'flex',
  'flexDirection': 'column',
  '@media (min-width: 1400px)': {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  'gap': '1rem',
});

const Title = styled(Typography)({
  margin: '3rem',
});

const Calculate = styled(Button)({
  gridColumn: '1 / -1',
});

type TaxResult = Record<TaxCategory, number>;

function App() {
  const media = window.matchMedia('(max-width: 600px)');
  const [mobile, setMobile] = React.useState(media.matches);
  const [payCycle, setPayCycle] = React.useState<PayCycle>('Fornightly');
  const [salary, setSalary] = React.useState('');
  const [taxInput, setTaxInput] = React.useState('');
  const [tax, setTax] = React.useState(NaN);
  const [output, setOutput] = React.useState<TaxResult | undefined>();
  const [openUploading, setOpenUploading] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleCloseError = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setOpenError(false);
  };

  const handleCloseUploading = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setOpenUploading(false);
  };

  const handleCloseSuccess = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setOpenSuccess(false);
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

  const handleCalculate = () => {
    setOutput({
      [TaxCategory.TaxFreeThreshold]: calcTaxFreeThresholdTax(parseFloat(salary), payCycle),
      [TaxCategory.NoTaxFreeThreshold]: calcNoTaxFreeThresholdTax(parseFloat(salary), payCycle),
      [TaxCategory.WorkingHolidayMaker]: calcWorkingHolidayMakerTax(parseFloat(salary), payCycle),
      [TaxCategory.NonResident]: calcNonResidentTax(parseFloat(salary), payCycle),
    });
    setTax(parseFloat(taxInput));
  };

  return (
    <Main>
      <CssBaseline />
      <Title variant='h2'>
        Tax Calculator
      </Title>
      <Form>
        <TextField
          variant='outlined'
          value={salary}
          label='Salary'
          type='number'
          onChange={({ target }) => onChangeHandler(target.value, setSalary)}
        />
        <TextField
          variant='outlined'
          value={taxInput}
          label='Tax (optional)'
          type='number'
          onChange={({ target }) => onChangeHandler(target.value, setTaxInput)}
        />
        <FormControl>
          <InputLabel id="select-label">Pay Cycle</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={payCycle}
            label="Pay Cycle"
            onChange={({ target }) => setPayCycle(target.value as PayCycle)}
          >
            <MenuItem value={'Annually'}>Annually</MenuItem>
            <MenuItem value={'Fornightly'}>Fornightly</MenuItem>
            <MenuItem value={'Weekly'}>Weekly</MenuItem>
          </Select>
        </FormControl>
        <UploadButton
          mobile={mobile}
          setTax={setTaxInput}
          setSalary={setSalary}
          setPayCycle={setPayCycle}
          setOpenUploading={setOpenUploading}
          setOpenError={setOpenError}
          setOpenSuccess={setOpenSuccess}
        />
        <Calculate
          variant='contained'
          onClick={handleCalculate}
          startIcon={<CalculateIcon />}
          endIcon={<CalculateIcon />}
          size='large'
        >
          Calculate
        </Calculate>
      </Form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openUploading}
        onClose={handleCloseUploading}
      >
        <Alert
          severity='info'
          onClose={handleCloseUploading}
        >
          Uploading payslip
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert
          severity='error'
          onClose={handleCloseError}
        >
          Failed uploading payslip
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
      >
        <Alert
          severity='success'
          onClose={handleCloseSuccess}
        >
          Payslip uploaded successfully
        </Alert>
      </Snackbar>
      <CardContainer>
        <CardColumn>
        {taxCategories.slice(0, 2).map((category) => {
          const calculatedTax = output?.[category.id] || 0;
          return (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              link={category.link}
              amount={calculatedTax}
              checked={Math.abs(tax - calculatedTax) < 2}
              taxTable={category.taxTable}
            />
          );
        })}
        </CardColumn>
        <CardColumn>
        {taxCategories.slice(2).map((category) => {
          const calculatedTax = output?.[category.id] || 0;
          return (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              link={category.link}
              amount={calculatedTax}
              checked={Math.abs(tax - calculatedTax) < 2}
              taxTable={category.taxTable}
            />
          );
        })}
        </CardColumn>
      </CardContainer>
    </Main>
  );
}

export default App;
