import React, { useState } from 'react';
import {
  Box,
  CardActionArea,
  Typography,
  Link,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircleOutline } from '@mui/icons-material';
import TaxTable from './TaxTable';
import { TaxTableData } from '../type';
import { motion } from 'framer-motion';

const Header = styled(Box)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  marginBottom: '0.4rem',
});

const Card = styled(motion.div)({
  maxWidth: '40rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: 'rgb(28,28,28)',
  borderRadius: '5px',
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
  const [open, setIsOpen] = useState(false);
  return (
    <CardActionArea sx={{ borderRadius: '5px' }}>
      <Card layout='position'>
        <motion.div layout='position' onClick={() => setIsOpen(!open)}>
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
          <br />
          {
            open &&
            (
              <>
                <TaxTable data={taxTable} />
                <br />
              </>
            )
          }
        </motion.div>
        <Link
          href={link}
          target='_blank'
          sx={{ textDecoration: 'none !important' }}
        >
          Learn More
        </Link>
      </Card>
    </CardActionArea>
  );
}
