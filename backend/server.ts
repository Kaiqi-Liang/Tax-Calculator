import { PORT, SERVER_URL } from '../config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileupload from 'express-fileupload';
import pdf from 'pdf-parse';

const app = express();
app.use(morgan('dev'));
app.use(fileupload());
app.use(cors());

const grep = (lines: string[], index: number) => {
  for (let i = index + 1; i < lines.length; ++i) {
    const number = lines[i].match(/\d{1,3}(,\d{3})*\.\d{2}/);
    if (number) {
      return parseFloat(number[0].replace(/[^0-9.]/g, ""));
    }
  }
}

app.post('/', (req, res) => {
  if (!req.files || !req.files['pdf']) {
    res.status(400);
    res.end();
  }

  // @ts-ignore
  pdf(req.files['pdf']).then(({ text }) => {
    const lines = text.split('\n');
    const tax = lines.findIndex((line) => line.toLocaleLowerCase().includes('tax'));
    res.send({
      tax: grep(lines, tax),
      salary: grep(lines.reverse(), lines.length - tax - 1),
    });
  }).catch(() => {
    res.status(500);
    res.end();
  });
});

app.listen(PORT, () => console.log(`Starting server at: '${SERVER_URL}'`));
