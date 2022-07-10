import React from 'react';
import {
  CardActionArea,
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import MuiCard from '@mui/material/Card';
import { CheckCircleOutline } from '@mui/icons-material';
import TaxTable from './TaxTable';
import { TaxTableData } from '../type';

const Header = styled(Box)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  marginBottom: '0.4rem',
});

const Card = styled(MuiCard)({
  maxWidth: '40rem',
  minHeight: '40rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
});

export default function CategoryCard({
  title,
  description,
  link,
  amount,
  checked,
  taxTable,
}: {
  title: string,
  description: string,
  link: string,
  amount: number | undefined,
  checked?: boolean,
  taxTable: TaxTableData,
}) {
  return (
    <CardActionArea
      href={link}
      target='_blank'
    >
      <Card>
        <CardContent>
          <Header>
            <Typography variant='h3'>
              ${amount}
            </Typography>
            {checked && <CheckCircleOutline color='success' fontSize='large' />}
          </Header>
          <br />
          <Typography variant='h5' component='div'>
            {title}
          </Typography>
          <br />
          <Typography variant='body2'>
            {description}
          </Typography>
          <TaxTable data={taxTable}/>
        </CardContent>
        <CardActions>
          <Button
            color='secondary'
            size='large'
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </CardActionArea>
  );
}
