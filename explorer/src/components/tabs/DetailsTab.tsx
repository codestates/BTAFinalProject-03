import { JsonRpcProvider,Network  } from '@mysten/sui.js';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Link, useParams} from "react-router-dom";
const { useEffect, useState } = React;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const substitution = (txId: string): string => {
    return txId.replaceAll('!', '\/')
};

const DetailsTab = () => {
    const txId = useParams();
    const jsonId = JSON.stringify(txId);
    const resultId = JSON.parse(jsonId);

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={6} md={5}>
                    Package Details
                    <Item>
                            <table>
                                <tr>
                                    <td>Package ID</td>
                                    <td>
                                        {
                                            transactions &&
                                            transactions.effects &&
                                            transactions.effects.events[1] &&
                                            transactions.effects.events[1].newObject &&
                                            transactions.effects.events[1].newObject.packageId
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Module</td>
                                    <td>
                                        {
                                            transactions &&
                                            transactions.effects &&
                                            transactions.effects.events[1] &&
                                            transactions.effects.events[1].newObject &&
                                            transactions.effects.events[1].newObject.transactionModule
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Function</td>
                                    <td>
                                        {
                                            transactions &&
                                            transactions.certificate &&
                                            transactions.certificate.data &&
                                            transactions.certificate.data.transactions[0] &&
                                            transactions.certificate.data.transactions[0].Call &&
                                            transactions.certificate.data.transactions[0].Call.function
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Argument</td>
                                    <td> [
                                        {
                                            transactions &&
                                            transactions.certificate &&
                                            transactions.certificate.data &&
                                            transactions.certificate.data.transactions[0] &&
                                            transactions.certificate.data.transactions[0].Call &&
                                            transactions.certificate.data.transactions[0].Call.arguments.map((item: any, index: number)=>{
                                                if(transactions.certificate.data.transactions[0].Call.arguments.length == index+1) return JSON.stringify(item)
                                                else return JSON.stringify(item) + ","

                                            })
                                        }
                                        ]
                                    </td>
                                </tr>
                            </table>
                    </Item>
                </Grid>
                <Grid item xs={6} md={5}>
                    Sender
                    <Item>
                        {/*<Link to={'/get-addr/' + transactions.certificate.data.sender} state={{addr: transactions.certificate.data.sender}}>*/}
                            <span>
                                {
                                    transactions &&
                                    transactions.certificate &&
                                    transactions.certificate.data &&
                                    transactions.certificate.data.sender
                                }
                            </span>
                        {/*</Link>*/}
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={6} md={5}>
                    Updated
                    <Item>
                        <span>
                            {
                                transactions &&
                                transactions.certificate &&
                                transactions.certificate.data &&
                                transactions.certificate.data.gasPayment &&
                                transactions.certificate.data.gasPayment.objectId
                            }
                        </span>
                    </Item>
                </Grid>
                <Grid item xs={6} md={5}>
                    Created
                    <Item>
                        <span>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.created.map((item: any)=>{
                                    return item.reference.objectId
                                })
                            }
                        </span>
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={6} md={5}>
                    Gas & Storage Fees
                    <Item>
                        <table>
                            <tr>
                                <td>Gas Payment</td>
                                <td>
                                    {
                                        transactions &&
                                        transactions.certificate &&
                                        transactions.certificate.data &&
                                        transactions.certificate.data.gasPayment &&
                                        transactions.certificate.data.gasPayment.objectId
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Gas Fees</td>
                                <td>
                                    {
                                        transactions &&
                                        transactions.effects &&
                                        transactions.effects.events[0] &&
                                        transactions.effects.events[0].coinBalanceChange &&
                                        Math.abs(transactions.effects.events[0].coinBalanceChange.amount)
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Gas Budget</td>
                                <td>
                                    {
                                        transactions &&
                                        transactions.certificate &&
                                        transactions.certificate.data &&
                                        transactions.certificate.data.gasBudget
                                    }
                                </td>
                            </tr>
                        </table>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DetailsTab;