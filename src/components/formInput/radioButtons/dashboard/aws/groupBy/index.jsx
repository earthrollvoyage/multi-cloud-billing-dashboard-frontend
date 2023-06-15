import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createStyles, makeStyles } from '@mui/styles';
import { red } from '@material-ui/core/colors';

// const useStyles = makeStyles({
//     // Applied to <Radio />
//     root_first: {
//       width: 35,
//       height: 50,
//       paddingTop: 0,
//       paddingBottom: 0,
//       fontFamily: "Inter"
//     },
//     root_sec: {
//       width: 30,
//       height: 50,
//       paddingTop: 0,
//       paddingBottom: 0,
//       fontFamily: "Inter"
//     },
//     // Applied to <FormControlLabel />
//     label: {
//       fontSize: 5,
//     //   fontFamily: "Inter"
//     },
//     labels: {
//     ".label svg": {
//       width: "0.2em",
//       height: "1em"
//   }}
//   });

const useStyles = makeStyles(theme =>
  createStyles({
    smallRadioButton: {
      "& svg": {
        width: "0.5em",
        height: "0.5em"
      }
    }
  })
);

export default function RadioButtonsGroupBy({ groupBy, handleOnChange}) {
  const [value, setValue] = React.useState(groupBy);
  const classes = useStyles();

  const handleChange = (event) => {
      setValue(event.target.value);
      handleOnChange(event.target.value);
  };

  const customFirstRadio = <Radio size="small" classes={{root: classes.labels}} />;
  const customSecRadio = <Radio size="small" classes={{root: classes.root_sec}} />;

  // return (
  //   <RadioGroup value={value}  onChange={handleChange}>
  //     <FormControlLabel
  //       classes={{label: classes.label}}
  //       value="correct"
  //       control={<Radio color="primary" />}
  //       label="Correct"
  //       labelPlacement="left"
  //       className={classes.smallRadioButton}
  //     />
  //     <FormControlLabel
  //       classes={{label: classes.label}}
  //       value="incorrect"
  //       control={<Radio color="primary" />}
  //       label="Incorrect"
  //       labelPlacement="left"
  //       className={classes.smallRadioButton}
  //     />
  //   </RadioGroup>
  // );
  return (
      <FormControl component="fieldset" style={{ marginTop: "20px", fontFamily: "Inter" }}>
      {/* <Typography style={{ 
          fontSize: "10px", 
          fontFamily: "Inter", 
          // marginTop: "20px", 
          // color: "rgb(236, 140, 52)",
          fontWeight: "bold"  }}>Group By</Typography> */}
      {/* <FormLabel component="legend" style={{ fontSize: "16px", fontFamily: "Inter", color: "rgb(52, 52, 52)" }}>Group by</FormLabel> */}
      <RadioGroup 
          aria-label="groupBy"
          name="radio-buttons-group"
          style={{ display: "flex", flexDirection: "row"}}
          value={value} 
          onChange={handleChange} >
          <FormControlLabel label={<span style={{ fontSize: '10px' }}>{"Linked Account"}</span>} control={<Radio color="primary" />} className={classes.smallRadioButton} value="linked_account" />
          <FormControlLabel label={<span style={{ fontSize: '10px' }}>{"Service"}</span>}  control={<Radio color="primary" />} className={classes.smallRadioButton} value="service" />
      </RadioGroup>
      </FormControl>
  );
}
