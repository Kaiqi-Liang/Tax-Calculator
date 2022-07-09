import React from 'react';
import {
  TextField,
  CssBaseline,
  Button,
  Box,
  Typography,
  Stack,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import CalculateIcon from '@mui/icons-material/Calculate';
import CloseIcon from '@mui/icons-material/Close';
import {
  calcNonResidentTax,
  calcNoTaxFreeThresholdTax,
  calcTaxFreeThresholdTax,
} from './utils';
import CategoryCard from './components/CategoryCard';
import UploadButton from './components/Upload';

const Main = styled('div')({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Form = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '12rem',
  padding: '20px',
  marginBottom: '2rem',
  columnGap: '1rem',
  rowGap: '1rem',
});

const CardContainer = styled(Box)({
  display: 'flex',
  gap: '2rem',
  paddingBottom: '3rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '0 5rem',
});

const Title = styled(Typography)({
  margin: '3rem',
});

enum TaxCategory {
  TaxFreeThreshold = 'TaxFreeThreshold',
  NonTaxFreeThreshold = 'nonTaxFreeThreshold',
  NonResident = 'nonResident'
}

const taxCategories = [
  {
    id: TaxCategory.TaxFreeThreshold,
    title: 'Tax Free Threshold',
    description: 'If you are an Australian resident for tax purposes for a full year, you pay no tax on the first $18,200 of your income. This is called the tax-free threshold.',
    link: 'https://www.ato.gov.au/Individuals/Ind/Tax-free-threshold-for-newcomers-to-Australia/',
    taxFn: calcTaxFreeThresholdTax,
  },
  {
    id: TaxCategory.NonTaxFreeThreshold,
    title: 'Non Tax Free Threshold',
    description: 'Claiming the tax-free threshold ($18,200) reduces the amount of tax withheld from your income. If you have more than one payer at the same time, generally, you only claim the tax-free threshold from one payer so that payer will tax you slightly less than the others',
    link: 'https://www.ato.gov.au/Individuals/Jobs-and-employment-types/Working-as-an-employee/Income-from-more-than-one-job/',
    taxFn: calcNoTaxFreeThresholdTax,
  },
  {
    id: TaxCategory.NonResident,
    title: 'Non Resident',
    description: 'Essentially, this will affect how much tax you pay. Non-residents get taxed at a higher rate than residents in Australia. The main requirement to be deemed a resident for tax purposes is that you have continuously resided in Australia for a period of 183 days (6 months).',
    link: 'https://www.ato.gov.au/Individuals/Coming-to-Australia-or-going-overseas/Your-tax-residency/Australian-resident-for-tax-purposes/',
    taxFn: calcNonResidentTax,
  },
];

type TaxResult = Record<TaxCategory, number>;

function App() {
  const [salary, setSalary] = React.useState<string>('');
  const [taxInput, setTaxInput] = React.useState<string>('');
  const [tax, setTax] = React.useState<number>(NaN);
  const [output, setOutput] = React.useState<TaxResult | undefined>();
  const [open, setOpen] = React.useState(false);

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

  const handleCalculate = () => {
    const fsalary = parseFloat(salary);
    setOutput({
      [TaxCategory.TaxFreeThreshold]: calcTaxFreeThresholdTax(fsalary),
      [TaxCategory.NonTaxFreeThreshold]: calcNoTaxFreeThresholdTax(fsalary),
      [TaxCategory.NonResident]: calcNonResidentTax(fsalary),
    });
    setTax(parseFloat(taxInput));
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
      <Title variant='h1'>
        Tax Calculator
      </Title>
      <Form>
        <TextField
          variant='outlined'
          value={salary}
          label='Fortnightly salary'
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
        <UploadButton
          setTax={setTaxInput}
          setSalary={setSalary}
          setOpen={setOpen}
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            fullWidth
            variant='contained'
            onClick={handleCalculate}
            startIcon={<CalculateIcon />}
            endIcon={<CalculateIcon />}
          >
          Calculate
          </Button>
        </Stack>
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
      <CardContainer>
        {taxCategories.map((item) => {
          const calculatedTax = output?.[item.id] || 0;
          return (<Box key={item.title} >
            <CategoryCard
              title={item.title}
              description={item.description}
              link={item.link}
              amount={calculatedTax}
              checked={Math.abs(tax - calculatedTax) < 2}
            />
          </Box>);
        })}
      </CardContainer>
    </Main>
  );
}

export default App;
