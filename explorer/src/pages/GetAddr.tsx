import {Link, useParams} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {JsonRpcProvider, Network} from "@mysten/sui.js";
import * as React from "react";
import {
    Box,
    Divider, LinearProgress,
    List,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const Div = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));

const StyledGridOverlay = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                    </g>
                </g>
            </svg>
            <Box sx={{mt: 1}}>No Data</Box>
        </StyledGridOverlay>
    );
}

const GetAddr = () => {
    const addr = useParams();
    const jsonId = JSON.stringify(addr);
    const resultId = JSON.parse(jsonId);

    let balAvg = 0;

    const [transactions, setTransactions] = useState<any>({});
    const [balance, setBalance] = useState<any>({});
    const [nftNum, setNftNum] = useState<any>(0);
    const [data, setData] = useState<any>(true);
    const isMounted = useRef(false)

    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        getTransaction(resultId.addr);
    }, [])

    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        if (transactions.length > 0) {
            getBalance()
        }
    }, [transactions])

    useEffect(() => {
        if (isMounted.current) {
            setData(false)
        } else {
            isMounted.current = true;
        }
    }, [transactions])

    const getTransaction = async (addr: string) => {
        const resultObj = await provider.getObjectsOwnedByAddress(addr);
        const resultJson = JSON.stringify(resultObj);
        const parseResult = JSON.parse(resultJson);
        await setTransactions(parseResult);
    }

    const getBalance = async () => {
        const list: string[] = [];
        if (transactions[0]) {
            transactions.map((item: any) => {
                if (item.type == "0x2::coin::Coin<0x2::sui::SUI>")
                    list.push(item.objectId);
            })
        }
        if (list.length > 0) {
            const resultObjBalance = await provider.getObjectBatch(list);
            const balanceJson = JSON.stringify(resultObjBalance);
            const balanceResult = JSON.parse(balanceJson);
            setBalance(balanceResult)
        }
    }

    return (
        <>
            {
                data &&
                <LinearProgress/>
            }
            <Div>
                <Typography variant="subtitle1" gutterBottom><AlternateEmailIcon sx={{width: 15, height: 15}} />Address </Typography>
                <Typography variant="h6" gutterBottom>
                    {
                        transactions[0] &&
                        transactions[0].owner &&
                        transactions[0].owner.AddressOwner
                    }
                </Typography>
                <Divider/>
                <div>
                    <Box bgcolor="info" p={2}>
                        <Typography variant="h6" gutterBottom>Owned Objects</Typography>
                        <b><h3>Coins</h3></b>
                        <TableContainer>
                            <Table sx={{width: 1000}} aria-label="simple table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell>TYPE</TableCell>
                                        <TableCell>OBJECTS</TableCell>
                                        <TableCell>BALANCE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>SUI</TableCell>
                                        <TableCell>{balance.length}</TableCell>
                                        {
                                            balance[0] &&
                                            balance.map((item: any) => {
                                                balAvg += (item.details.data.fields.balance / 1000000000);
                                            })
                                        }
                                        <TableCell>
                                            {balAvg}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <List component="span"
                              sx={{
                                  overflow: 'auto',
                                  width: 1000,
                                  height: 300,
                                  display: 'block'
                              }}>
                            <TableContainer>
                                <Table aria-label="coin table">
                                    <TableBody>
                                        {
                                            balance[0] &&
                                            balance.map((item: any) => {
                                                return (
                                                    <>
                                                        <TableRow>
                                                            <TableCell>Object ID</TableCell>
                                                            <TableCell>
                                                                <Link to={'/get-obj/' + item.details.data.fields.id.id}
                                                                      state={{objId: item.details.data.fields.id.id}}>
                                                                    {item.details.data.fields.id.id}
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>Balance</TableCell>
                                                            <TableCell>{item.details.data.fields.balance / 1000000000}</TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </List>
                    </Box>

                    <Box bgcolor="info" p={2}>
                        <b><h3>NFTs</h3></b>
                        <List component="span"
                              sx={{
                                  overflow: 'auto',
                                  width: 1000,
                                  height: 300,
                                  display: 'block'
                              }}>
                            <TableContainer>
                                <Table aria-label="nft table">
                                    {
                                        transactions[0] &&
                                        transactions.map((item: any) => {
                                            if (item.type == "0x2::devnet_nft::DevNetNFT") {
                                                if (!nftNum) {
                                                    setNftNum(1);
                                                }
                                                return (
                                                    <>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>Object ID</TableCell>
                                                                <TableCell>
                                                                    <Link to={'/get-obj/' + item.objectId}
                                                                          state={{objId: item.objectId}}>
                                                                        {item.objectId}
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>{item.type}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                    {
                                        nftNum != 1 &&
                                        <div>
                                            <CustomNoRowsOverlay/>
                                        </div>
                                    }
                                </Table>
                            </TableContainer>
                        </List>
                    </Box>
                </div>
            </Div>
        </>
    )
}

export default GetAddr;