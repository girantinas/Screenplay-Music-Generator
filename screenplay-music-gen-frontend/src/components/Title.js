import React from 'react';

import Typography from '@mui/material/Typography';
  
const Title = () => {
    return(
      <div>
    <Typography variant="h2" align="center"
      sx={{
        fontWeight: 'bold',
        backgroundcolor: "primary",
        backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
        backgroundSize: "100%",
        backgroundRepeat: "repeat",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
      Score AI
    </Typography>
    <Typography align="center" color="white">
      Transform any text into your personal soundtrack
    </Typography>
    </div>
    )
  }
  
export default Title;