import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  LinearProgress,
  List,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { provider } from "../../utils/SDK";

const substitution = (txId: string): string => {
  return txId.replaceAll("!", "/");
};

const EventsTab = () => {
  const txId = useParams();
  const jsonId = JSON.stringify(txId);
  const resultId = JSON.parse(jsonId);

  const [transactions, setTransactions] = useState<any>({});
  const [data, setData] = useState<any>(true);
  const isMounted = useRef(false);

  useEffect(() => {
    // 마운트 하지 않아도 실행 하는 소스
    getTransaction(substitution(resultId.txId));
  }, [resultId]);

  useEffect(() => {
    if (isMounted.current) {
      setData(false);
    } else {
      isMounted.current = true;
    }
  }, [transactions]);

  const getTransaction = async (txId: string) => {
    const resultObj = await provider.getTransactionWithEffects(txId);
    const resultJson = JSON.stringify(resultObj);
    const parseResult = JSON.parse(resultJson);
    setTransactions(parseResult);
  };

  return (
    <>
      {data && <LinearProgress />}

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={2} md={1}>
          <Typography variant="button" display="block" gutterBottom>
            overview
          </Typography>
          <TableContainer>
            <Table sx={{ width: "auto" }} aria-label="simple table">
              <TableBody>
                {transactions &&
                  transactions.effects &&
                  transactions.effects.events &&
                  transactions.effects.events.map((item: any) => {
                    if (item.coinBalanceChange) {
                      return (
                        <TableRow>
                          <TableCell>Coin Balance Change</TableCell>
                        </TableRow>
                      );
                    } else if (item.mutateObject) {
                      return (
                        <TableRow>
                          <TableCell>Mutate Object</TableCell>
                        </TableRow>
                      );
                    } else if (item.moveEvent) {
                      return (
                        <TableRow>
                          <TableCell>Move Event</TableCell>
                        </TableRow>
                      );
                    } else if (item.newObject) {
                      return (
                        <TableRow>
                          <TableCell>New Objects</TableCell>
                        </TableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6} md={5}>
          <List
            component="span"
            sx={{
              overflow: "auto",
              height: 1000,
              width: 1500,
              display: "block",
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            {transactions &&
              transactions.effects &&
              transactions.effects.events &&
              transactions.effects.events.map((item: any) => {
                if (item.coinBalanceChange) {
                  return (
                    <div>
                      <Typography variant="button" display="block" gutterBottom>
                        Coin Balance Change
                      </Typography>
                      <Box bgcolor="info" p={2}>
                        <TableContainer>
                          <Table sx={{ width: 1000 }} aria-label="simple table">
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Sender
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  {transactions.certificate && (
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      <Link
                                        to={
                                          "/get-addr/" +
                                          transactions.certificate.data.sender
                                        }
                                        state={{
                                          addr: transactions.certificate.data
                                            .sender,
                                        }}
                                        style={{
                                          color: "rgb(31 100 147)",
                                          textDecoration: "none",
                                        }}
                                      >
                                        {transactions &&
                                          transactions.certificate &&
                                          transactions.certificate.data &&
                                          transactions.certificate.data.sender}
                                      </Link>
                                    </Typography>
                                  )}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Balance Change Type
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.coinBalanceChange &&
                                      item.coinBalanceChange.changeType}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Coin Type</TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.coinBalanceChange &&
                                      item.coinBalanceChange.coinType}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Coin Object ID
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    <Link
                                      to={
                                        "/get-obj/" +
                                        item.coinBalanceChange.coinObjectId
                                      }
                                      state={{
                                        objId:
                                          item.coinBalanceChange.coinObjectId,
                                      }}
                                      style={{
                                        color: "rgb(31 100 147)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item &&
                                        item.coinBalanceChange &&
                                        item.coinBalanceChange.coinObjectId}
                                    </Link>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Version
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.coinBalanceChange &&
                                      item.coinBalanceChange.version}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Owner
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    <Link
                                      to={
                                        "/get-addr/" +
                                        item.coinBalanceChange.owner
                                          .AddressOwner
                                      }
                                      state={{
                                        addr: item.coinBalanceChange.owner
                                          .AddressOwner,
                                      }}
                                      style={{
                                        color: "rgb(31 100 147)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item &&
                                        item.coinBalanceChange &&
                                        item.coinBalanceChange.owner &&
                                        item.coinBalanceChange.owner
                                          .AddressOwner}
                                    </Link>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Amount
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.coinBalanceChange &&
                                      item.coinBalanceChange.amount}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </div>
                  );
                } else if (item.mutateObject) {
                  return (
                    <div>
                      <Typography variant="button" display="block" gutterBottom>
                        Mutate Object
                      </Typography>
                      <Box bgcolor="info" p={2}>
                        <TableContainer>
                          <Table sx={{ width: 1000 }} aria-label="simple table">
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Object Type
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.mutateObject &&
                                      item.mutateObject.objectType}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Object ID
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    <Link
                                      to={
                                        "/get-obj/" + item.mutateObject.objectId
                                      }
                                      state={{
                                        objId: item.mutateObject.objectId,
                                      }}
                                      style={{
                                        color: "rgb(31 100 147)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item &&
                                        item.mutateObject &&
                                        item.mutateObject.objectId}
                                    </Link>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Version
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.mutateObject &&
                                      item.mutateObject.version}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Sender
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    <Link
                                      to={
                                        "/get-addr/" + item.mutateObject.sender
                                      }
                                      state={{ addr: item.mutateObject.sender }}
                                      style={{
                                        color: "rgb(31 100 147)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item &&
                                        item.mutateObject &&
                                        item.mutateObject.sender}
                                    </Link>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </div>
                  );
                } else if (item.newObject) {
                  return (
                    <div>
                      <Typography variant="button" display="block" gutterBottom>
                        New Object
                      </Typography>
                      <Box bgcolor="info" p={2}>
                        <TableContainer>
                          <Table sx={{ width: 1000 }} aria-label="simple table">
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Module
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {item &&
                                      item.newObject &&
                                      item.newObject.transactionModule}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                  >
                                    Sender, Recipient
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    <Link
                                      to={"/get-addr/" + item.newObject.sender}
                                      state={{ addr: item.newObject.sender }}
                                      style={{
                                        color: "rgb(31 100 147)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item &&
                                        item.newObject &&
                                        item.newObject.sender}
                                    </Link>
                                    <span>→</span>
                                    <Link
                                      to={
                                        "/get-addr/" +
                                        item.newObject.recipient.AddressOwner
                                      }
                                      state={{
                                        addr: item.newObject.recipient
                                          .AddressOwner,
                                      }}
                                      style={{
                                        color: "rgb(31 100 147)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {item &&
                                        item.newObject &&
                                        item.newObject.recipient &&
                                        item.newObject.recipient.AddressOwner}
                                    </Link>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </div>
                  );
                } else if (item.moveEvent) {
                  return (
                    <div>
                      <Typography variant="button" display="block" gutterBottom>
                        Move Event
                      </Typography>
                      <Box bgcolor="info" p={2}>
                        <TableContainer>
                          <Table sx={{ width: 1000 }} aria-label="simple table">
                            <TableBody>
                              {item && item.moveEvent && (
                                <TableRow>
                                  <TableCell>
                                    <Typography
                                      variant="overline"
                                      display="block"
                                      gutterBottom
                                    >
                                      Type
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      {item.moveEvent.type}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )}
                              {transactions &&
                                transactions.effects &&
                                item &&
                                item.moveEvent && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        Sender
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Link
                                        to={
                                          "/get-addr/" + item.moveEvent.sender
                                        }
                                        state={{ addr: item.moveEvent.sender }}
                                        style={{
                                          textDecoration: "none",
                                        }}
                                      >
                                        <Typography
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                          style={{
                                            color: "rgb(31 100 147)",
                                          }}
                                        >
                                          {item.moveEvent.sender}
                                        </Typography>
                                      </Link>
                                    </TableCell>
                                  </TableRow>
                                )}
                              {item && item.moveEvent && (
                                <TableRow>
                                  <TableCell>
                                    <Typography
                                      variant="overline"
                                      display="block"
                                      gutterBottom
                                    >
                                      BCS
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      {item.moveEvent.bcs}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )}
                              <br />
                              {item && item.moveEvent && item.moveEvent.fields && (
                                <Typography
                                  variant="overline"
                                  display="block"
                                  gutterBottom
                                >
                                  Fields
                                </Typography>
                              )}
                              {item &&
                                item.moveEvent &&
                                item.moveEvent.fields &&
                                item.moveEvent.fields.creator && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        creator
                                      </Typography>
                                    </TableCell>

                                    <TableCell>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {item.moveEvent.fields.creator}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              {item &&
                                item.moveEvent &&
                                item.moveEvent.fields &&
                                item.moveEvent.fields.name && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        name
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {item.moveEvent.fields.name}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              {item &&
                                item.moveEvent &&
                                item.moveEvent.fields &&
                                item.moveEvent.fields.object_id && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        object_id
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {item.moveEvent.fields.object_id}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              {item &&
                                item.moveEvent &&
                                item.moveEvent.fields &&
                                item.moveEvent.fields.amm_id && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        amm_id
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {item.moveEvent.fields.amm_id}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              {item &&
                                item.moveEvent &&
                                item.moveEvent.fields &&
                                item.moveEvent.fields.token_amount && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        token_amount
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {item.moveEvent.fields.token_amount}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              {item &&
                                item.moveEvent &&
                                item.moveEvent.fields &&
                                item.moveEvent.fields.token_type && (
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        variant="overline"
                                        display="block"
                                        gutterBottom
                                      >
                                        token_type
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {item.moveEvent.fields.token_type}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </div>
                  );
                }
              })}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default EventsTab;
