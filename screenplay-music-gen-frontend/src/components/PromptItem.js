import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const PromptItem = (props) => {
    return (<Box sx={{ border: 1 }} width='20%' onClick={() => alert("Hello world")}> <Stack item xs={4}>{props.prompt}</Stack> </Box>);
};

export default PromptItem;