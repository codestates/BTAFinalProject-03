import {useParams} from "react-router-dom";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

import DetailsTab from "../components/tabs/DetailsTab";
import EventsTab from "../components/tabs/EventsTab";
import SignaturesTab from "../components/tabs/SignaturesTab";
import {JsonRpcProvider, Network} from "@mysten/sui.js";
import {useEffect, useState} from "react";
import {Popover} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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

const Div = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

const substitution = (txId: string): string => {
    return txId.replaceAll('!', '\/')
};

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const GetTx = () => {
    const txId = useParams();
    const jsonId = JSON.stringify(txId);
    const resultId = JSON.parse(jsonId);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [transactions, setTransactions] = useState<any>({});

    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        getTransaction(substitution(resultId.txId));
    }, [])

    const getTransaction = async (txId: string) => {
        const resultObj = await provider.getTransactionWithEffects(txId);
        const resultJson = JSON.stringify(resultObj);
        const parseResult = JSON.parse(resultJson);
        setTransactions(parseResult);
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Div>
                <Typography variant="h6" gutterBottom>
                    {
                        transactions &&
                        transactions.certificate &&
                        transactions.certificate.transactionDigest
                    }&nbsp;&nbsp;
                    {
                        transactions &&
                        transactions.effects &&
                        transactions.effects.status &&
                        transactions.effects.status.status == "success" ?
                            <CheckCircleOutlineIcon color="success"/>
                            :
                            <>
                                <span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                                    <ErrorOutlineIcon color="error"/>
                                </span>
                                {
                                    transactions.effects &&
                                    <Popover
                                        id="mouse-over-popover"
                                        sx={{
                                            pointerEvents: 'none',
                                        }}
                                        open={open}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        onClose={handlePopoverClose}
                                        disableRestoreFocus
                                    >
                                        <Box sx={{
                                            border: 1,
                                            borderColor: 'error.main',
                                            borderRadius: '4px',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                            display: 'flex'
                                        }}>
                                            <ErrorOutlineIcon sx={{width: 20, height: 20}} color="error"/>
                                            <Typography variant="caption" sx={{p: 1}}>
                                                {transactions.effects.status.error}
                                            </Typography>
                                        </Box>
                                    </Popover>
                                }
                            </>
                    }
                </Typography>
            </Div>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="Events" {...a11yProps(1)} />
                        <Tab label="Signatures" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <DetailsTab/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EventsTab/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SignaturesTab/>
                </TabPanel>
            </Box>
        </div>
    );
};

export default GetTx;
