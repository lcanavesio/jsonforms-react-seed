import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Fragment, useMemo, useState } from 'react';
import './App.css';
import logo from './logo.svg';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import schema from './schema.json';
import uischema from './uischema.json';

import { Typography } from '@mui/material';
import MaterialDateControl, {
  materialDateControlTester,
} from './MaterialDateControl';

const useStyles = () => ({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  date: '01/01/2022',
  dateES: '06/06/2022',
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  {
    tester: materialDateControlTester,
    renderer: MaterialDateControl,
  },
];

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  const handleChange = (errors: any, data: any) => {
    console.log('errors', errors);
    setData(data);
  };
  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to JSON Forms with React</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        sx={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h4'} sx={classes.title}>
            Bound data
          </Typography>
          <Grid sx={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </Grid>
          <Button
            sx={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h4'} sx={classes.title}>
            Rendered form
          </Typography>
          <Grid sx={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => handleChange(errors, data)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
