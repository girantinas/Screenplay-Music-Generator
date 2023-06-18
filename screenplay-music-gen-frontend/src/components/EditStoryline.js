import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    borderRadius: '20px',
    background: '#9c27b0',
    color: '#fff',
    padding: '10px 20px',
  },
};

const EditStoryline = withStyles(styles)(({ classes }) => {
  return (
    <Button className={classes.button}>
      Edit Storyline
    </Button>
  );
});

export default EditStoryline;