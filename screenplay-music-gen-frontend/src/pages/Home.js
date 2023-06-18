import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Title from '../components/Title';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';
  
const Home = () => {
  const navigate = useNavigate();
    const [text, setText] = useState([]);
    const [screenplayInput, setScreenplayInput] = useState("");
    const [dataFetched, setDataFetched] = useState(true)


    const handleClick = () => {
      // Navigate to a different route when the button is clicked
      navigate('/about');
    };

    const submitScreenplayText = () => {
        setDataFetched(false);
        axios.post('http://localhost:8000/screenplay-input/', {
            'text': screenplayInput
        }).then((response) => {
            setDataFetched(true);
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }

    useEffect(() =>  {
        // let data;
        // axios.get('http://localhost:8000/wel/')
        // .then(res => {
        //     data = res.data;
        //     this.setText(data);
        // })
        // .catch(err => {})
    });
  
    return(

      <div>
            <Box
      display="flex"
      justifyContent="flex-end"
      paddingTop={2}
      paddingRight={2}
    >
      <IconButton aria-label="About" onClick={handleClick}>
        <InfoIcon />About
      </IconButton>
    </Box>
            <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
        <Stack>
          <Title />

        <FormControl>
    {/* <FormLabel>Enter Name</FormLabel> */}
    <Box display="flex" justifyContent="center">
    <TextField id="outlined-basic" 
    label="Screenplay Text" 
    variant="outlined" 
    style={{ width: '1000px' }}
      multiline
    onChange={ (e) => setScreenplayInput(e.target.value) }/>
      </Box>
    <Button onClick={submitScreenplayText}>Submit</Button>
</FormControl>
            {/* {text.map((text, id) =>  (
            <div key={id}>
            <div >
                  <div >
                        <h1>{text.text} </h1>
                        <footer >--- by
                        <cite title="Source Title">
                        {text.text}</cite>
                        </footer>
                  </div>
            </div>
            </div>
            )
        )} */}
        {!dataFetched ? <CircularProgress /> : <h1>yes</h1>}

        </Stack>
        </Grid>
      </div> 
      );
  }
  
export default Home;