import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Title from '../components/Title';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/material/Icon';
import FormRow from '@mui/material/FormControl'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  class Prompt {
    constructor(text) {
      this.text = text
      this.selected = false;
    }
  }

  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([new Prompt("")]);
  const [selectedPrompts, setSelectedPrompts] = useState([new Prompt("")])
  const [musicSrc, setMusicSrc] = useState("");
  const [screenplayInput, setScreenplayInput] = useState("");
  const [isAudioFetched, setIsAudioFetched] = useState(false);
  const [isAudioFetching, setIsAudioFetching] = useState(false);
  const [isBlocksFetched, setIsBlocksFetched] = useState(false);
  const [isBlocksFetching, setIsBlocksFetching] = useState(false);

  const handleClick = () => {
    // Navigate to a different route when the button is clicked
    navigate('/about');
  };

  const submitSmartScreenplayText = () => {
    setIsAudioFetched(false);
    setIsAudioFetching(true);
    axios.post('http://localhost:8000/smart-screenplay-input/', { 'text': screenplayInput }, { responseType: 'blob', mode: 'cors' }).then((response) => {
      setMusicSrc(window.URL.createObjectURL(new Blob([response.data])));
      setIsAudioFetched(true);
      setIsAudioFetching(false);
    }, (error) => {
      console.log(error);
    });
  }

  const submitAdvancedScreenplayText = () => {
    setIsBlocksFetched(false);
    setIsBlocksFetching(true);
    axios.post('http://localhost:8000/advanced-screenplay-input/', { 'text': screenplayInput }, { mode: 'cors' }).then((response) => {
      console.log(response.data.split("*").map((v) => new Prompt(v)).map((v) => v.text))
      setPrompts(response.data.split("*").map((v) => new Prompt(v)))
      setIsBlocksFetched(true);
      setIsBlocksFetching(false);
    }, (error) => {
      console.log(error);
    });
  }

  return (
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
        <Stack spacing={2}>
          <Title />

          {/* <FormLabel>Enter Name</FormLabel> */}
          <FormControl>
            <Box display="flex" justifyContent="center" m={1} alignItems="center">

              <TextField id="outlined-basic"
                label="Screenplay Text"
                variant="outlined"
                style={{ width: '1000px' }}
                multiline
                onChange={(e) => setScreenplayInput(e.target.value)} />
            </Box>

            {!isBlocksFetching && !isBlocksFetched && <Box display="flex" justifyContent="center">
              {/* TODO: Make into settings panel. */}
              <Button size='large' onClick={submitSmartScreenplayText}>Smart Music Generation</Button>
              <Button size='large' onClick={submitAdvancedScreenplayText}>Customize</Button>
            </Box>}

          </FormControl>
          {isBlocksFetched && 
          <Stack container spacing={5}>
              <Box xs={4} border={1}>
                {prompts.filter(prompts => !prompts.selected).map((prompt, i) => {
                  return (<Box item xs={4} border={1} width='30%' onClick={() => {
                  let ind = prompts.indexOf(prompt);
                  prompt.selected = true;
                  prompts[ind] = prompt;
                  selectedPrompts.push(prompt);
                  setSelectedPrompts(selectedPrompts);
                  setPrompts(prompts);
                  }}>{prompt.text}</Box>)})}
              </Box>

              <Box xs={4} border={1}>
              {selectedPrompts.filter(p => p.text !== "").map((prompt, i) => {
                  return (<Box item xs={4} border={1} onClick={() => {
                  let ind = prompts.indexOf(prompt);
                  prompt.selected = false;
                  prompts[ind] = prompt;
                  let ind2 = selectedPrompts.indexOf(prompt);
                  selectedPrompts.splice(ind2, 1);
                  setSelectedPrompts(selectedPrompts);
                  setPrompts(prompts);
                  }}>{prompt.text}</Box>)})}
              </Box>
            </Stack>}
          {isBlocksFetching && !isBlocksFetched && <CircularProgress />}
          {isBlocksFetched && prompts.filter((p) => p.selected).length > 0 && <Button size='large' onClick={submitAdvancedScreenplayText}>Generate</Button>}
          {isAudioFetched && <audio controls src={musicSrc} />}
          {isAudioFetching && !isAudioFetched && <CircularProgress />}
        </Stack>
      </Grid>
    </div>
  );
}

export default Home;