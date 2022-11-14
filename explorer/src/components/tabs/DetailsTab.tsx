import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useParams } from "react-router-dom";
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { provider } from "../../utils/SDK";

const { useEffect, useState, useRef } = React;

const substitution = (txId: string): string => {
  return txId.replaceAll("!", "/");
};

const financial = (x: any): any => {
  return Number.parseFloat(x).toFixed(9);
};

const DetailsTab = () => {
  const txId = useParams();
  const jsonId = JSON.stringify(txId);
  const resultId = JSON.parse(jsonId);

  const [transactions, setTransactions] = useState<any>({});
  const [data, setData] = useState<any>(true);
  const isMounted = useRef(false);

  useEffect(() => {
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
        {transactions &&
          transactions.certificate &&
          transactions.certificate.data &&
          transactions.certificate.data.transactions[0] &&
          transactions.certificate.data.transactions[0].Call && (
            <Grid item xs={6} md={5}>
              <Typography variant="button" display="block" gutterBottom>
                Package Details
              </Typography>
              <Box bgcolor="info" p={2}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            Package ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {transactions.certificate.data.transactions[0].Call
                              .package &&
                              transactions.certificate.data.transactions[0].Call
                                .package.objectId}
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
                            Module
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {
                              transactions.certificate.data.transactions[0].Call
                                .module
                            }
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
                            Function
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {
                              transactions.certificate.data.transactions[0].Call
                                .function
                            }
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
                            Argument
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            [
                            {transactions.certificate.data.transactions[0].Call.arguments.map(
                              (item: any, index: number) => {
                                if (
                                  transactions.certificate.data.transactions[0]
                                    .Call.arguments.length ===
                                  index + 1
                                )
                                  return JSON.stringify(item);
                                else return JSON.stringify(item) + ",";
                              }
                            )}
                            ]
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          )}
        <Grid item xs={6} md={5}>
          <Typography variant="button" display="block" gutterBottom>
            Sender
          </Typography>
          <Box bgcolor="info" p={2}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {transactions.certificate && (
                    <Link
                      to={"/get-addr/" + transactions.certificate.data.sender}
                      state={{ addr: transactions.certificate.data.sender }}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          style={{
                            color: "rgb(31 100 147)",
                            textDecoration: "none",
                          }}
                        >
                          {transactions &&
                            transactions.certificate &&
                            transactions.certificate.data &&
                            transactions.certificate.data.sender}
                        </Typography>
                      </TableCell>
                    </Link>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {transactions && transactions.effects && transactions.effects.mutated && (
          <Grid item xs={6} md={5}>
            <Typography variant="button" display="block" gutterBottom>
              Updated
            </Typography>
            <Box bgcolor="info" p={2}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {transactions &&
                      transactions.effects &&
                      transactions.effects.mutated &&
                      transactions.effects.mutated.map((item: any) => {
                        return (
                          <>
                            <Link
                              to={"/get-obj/" + item.reference.objectId}
                              state={{ objId: item.reference.objectId }}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <TableCell>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    color: "rgb(31 100 147)",
                                  }}
                                >
                                  {item.reference.objectId}
                                </Typography>
                              </TableCell>
                            </Link>
                            <br />
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}
        {transactions && transactions.effects && transactions.effects.created && (
          <Grid item xs={6} md={5}>
            <Typography variant="button" display="block" gutterBottom>
              Created
            </Typography>
            <Box bgcolor="info" p={2}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {transactions &&
                      transactions.effects &&
                      transactions.effects.created &&
                      transactions.effects.created.map((item: any) => {
                        return (
                          <>
                            <Link
                              to={"/get-obj/" + item.reference.objectId}
                              state={{ objId: item.reference.objectId }}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <TableCell>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    color: "rgb(31 100 147)",
                                  }}
                                >
                                  {item.reference.objectId}
                                </Typography>
                              </TableCell>
                            </Link>
                            <br />
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={6} md={5}>
          <Typography variant="button" display="block" gutterBottom>
            Gas & Storage Fees
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <Box bgcolor="info" p={2}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="overline"
                          display="block"
                          gutterBottom
                        >
                          Gas Payment
                        </Typography>
                      </TableCell>
                      {transactions.certificate && (
                        <TableCell>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            <Link
                              to={
                                "/get-obj/" +
                                transactions.certificate.data.gasPayment
                                  .objectId
                              }
                              state={{
                                objId:
                                  transactions.certificate.data.gasPayment
                                    .objectId,
                              }}
                              style={{
                                color: "rgb(31 100 147)",
                                textDecoration: "none",
                              }}
                            >
                              {transactions &&
                                transactions.certificate &&
                                transactions.certificate.data &&
                                transactions.certificate.data.gasPayment &&
                                transactions.certificate.data.gasPayment
                                  .objectId}
                            </Link>
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="overline"
                          display="block"
                          gutterBottom
                        >
                          Gas Budget
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {(transactions &&
                            transactions.certificate &&
                            transactions.certificate.data &&
                            transactions.certificate.data.gasBudget) /
                            1000000000}{" "}
                          SUI
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
                          Total Gas Fee
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {transactions &&
                            transactions.effects &&
                            transactions.effects.events[0] &&
                            transactions.effects.events[0].coinBalanceChange &&
                            financial(
                              Math.abs(
                                transactions.effects.events[0].coinBalanceChange
                                  .amount
                              ) * 0.000000001
                            )}{" "}
                          SUI
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsTab;
