import { useState } from 'react';
import * as React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ProductsPage() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
       New Prediction
        </Typography>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Parity" value="1" />
            <Tab label="sapre" value="2" />
            <Tab label="Emred" value="3" />
            <Tab label="Becone" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Parity</TabPanel>
        <TabPanel value="2">sapre</TabPanel>
        <TabPanel value="3">Emred</TabPanel>
        <TabPanel value="4">Becone</TabPanel>
      </TabContext>
    </Box>
  
      </Container>
    </>
  );
}
