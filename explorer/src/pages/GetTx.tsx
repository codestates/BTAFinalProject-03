import { useParams, useLocation  } from "react-router-dom";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DetailsTab from "../components/tabs/DetailsTab";
import EventsTab from "../components/tabs/EventsTab";
import SignaturesTab from "../components/tabs/SignaturesTab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const substitution = (txId: string): string => {
    return txId.replaceAll('!', '\/')
};

const GetTx = () => {
    const txId = useParams();
    const jsonId = JSON.stringify(txId);
    const resultId = JSON.parse(jsonId);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <h2>{substitution(resultId.txId)}</h2>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="Events" {...a11yProps(1)} />
                        <Tab label="Signatures" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <DetailsTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EventsTab />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SignaturesTab />
                </TabPanel>
            </Box>
        </div>
    );
};

export default GetTx;
