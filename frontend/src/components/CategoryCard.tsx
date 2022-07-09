import * as React from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { CheckCircleOutline } from '@mui/icons-material';
import { styled } from '@mui/system';

const Header = styled(Box)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  marginBottom: '0.4rem',
});

const Card = styled(MuiCard)({
  maxWidth: '20rem',
  minHeight: '25rem',
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
}: {
  title: string,
  description: string,
  link: string,
  amount: number | undefined,
  checked?: boolean
}) {
  return (
    <Card>
      <CardContent>
        <Header>
          <Typography variant="h3">
            ${amount}
          </Typography>
          {checked && <CheckCircleOutline color='success' fontSize='large' />}
        </Header>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <br />
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          href={link}
          target="_blank"
          color='secondary'
          sx={{ textDecoration: 'none !important' }}
        >
          Learn More
        </Link>
      </CardActions>
    </Card>
  );
}
