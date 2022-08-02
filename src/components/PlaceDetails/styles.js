import { makeStyles } from '@material-ui/core/styles';
import { NoEncryption } from '@material-ui/icons';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  dates: {
    display: 'inline', justifyContent: 'space-between',
  },
  hoursButton: {
    backgroundColor: 'transparent', fontWeight: 'bold', fontSize: '1em', padding: '5px',

    "&:hover": {
      color: 'blue', borderColor: 'blue', 
    }
  },

}));