import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    // Applied to <Radio />
    root_first: {
      width: 35,
      height: 50,
      paddingTop: 0,
      paddingBottom: 0,
      fontFamily: "Inter"
    },
    root_sec: {
      width: 30,
      height: 50,
      paddingTop: 0,
      paddingBottom: 0,
      fontFamily: "Inter"
    },
    // Applied to <FormControlLabel />
    label: {
      fontSize: 40,
    //   fontFamily: "Inter"
    }
  });


export default function RadioButtonsGroupBy({ groupBy, handleOnChange}) {
  const [value, setValue] = React.useState(groupBy);
  const classes = useStyles();

  const handleChange = (event) => {
      setValue(event.target.value);
      handleOnChange(event.target.value);
  };

  const customFirstRadio = <Radio size="small" classes={{root: classes.root_first}} />;
  const customSecRadio = <Radio size="small" classes={{root: classes.root_sec}} />;

  return (
      <FormControl component="fieldset" style={{ marginTop: "20px", fontFamily: "Inter" }}>
      <Typography style={{ 
          fontSize: "15px", 
          fontFamily: "Inter", 
          // marginTop: "20px", 
          // color: "rgb(236, 140, 52)",
          fontWeight: "bold"  }}>Group By</Typography>
      {/* <FormLabel component="legend" style={{ fontSize: "16px", fontFamily: "Inter", color: "rgb(52, 52, 52)" }}>Group by</FormLabel> */}
      <RadioGroup 
          aria-label="groupBy"
          name="radio-buttons-group"
          style={{ display: "flex", flexDirection: "row"}}
          value={value} 
          onChange={handleChange} >
          {/* <FormControlLabel classes={{label: classes.label}} control={customFirstRadio} value="billing_profile_name" label="Account" />
          <FormControlLabel classes={{label: classes.label}} control={customSecRadio} value="subscription_name" label="Subscription" /> */}
          {/* <FormControlLabel classes={{label: classes.label}} control={customFirstRadio} value="service_family" label="Service Group" />
          <FormControlLabel classes={{label: classes.label}} control={customSecRadio} value="service_name" label="Service Name" /> */}
      </RadioGroup>
      </FormControl>
  );
}
