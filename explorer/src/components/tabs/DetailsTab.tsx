import { JsonRpcProvider,Network  } from '@mysten/sui.js';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const DetailsTab = () => {

    /*
    * sui devnet endpoint URI : https://fullnode.devnet.sui.io
    */
    const provider = new JsonRpcProvider(Network.DEVNET);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} md={5}>
                    <b><h2>Package Details</h2></b>
                    <Item>
                        <table>
                            <tr>
                                <td>Package ID</td>
                                <td>Package ID DATA</td>
                            </tr>
                            <tr>
                                <td>Module</td>
                                <td>Module DATA</td>
                            </tr>
                            <tr>
                                <td>Function</td>
                                <td>Function DATA</td>
                            </tr>
                            <tr>
                                <td>Argument</td>
                                <td>Argument DATA</td>
                            </tr>
                        </table>
                    </Item>
                </Grid>
                <Grid item xs={6} md={5}>
                    <b><h2>Sender</h2></b>
                    <Item>
                        <span>Send Address</span>
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} md={5}>
                    <b><h2>Updated</h2></b>
                    <Item>
                        <span>object ID 1</span>
                    </Item>
                </Grid>
                <Grid item xs={6} md={5}>
                    <b><h2>Created</h2></b>
                    <Item>
                        <span>object ID 2</span>
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} md={5}>
                    <b><h2>Gas & Storage Fees</h2></b>
                    <Item>
                        <table>
                            <tr>
                                <td>Gas Payment</td>
                                <td>Package ID DATA</td>
                            </tr>
                            <tr>
                                <td>Gas Fees</td>
                                <td>Module DATA</td>
                            </tr>
                            <tr>
                                <td>Gas Budget</td>
                                <td>Function DATA</td>
                            </tr>
                        </table>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default DetailsTab;