import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { provider } from "../../utils/SDK";

const substitution = (txId: string): string => {
  return txId.replaceAll("!", "/");
};

const SignaturesTab = () => {
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

      <div>
        <Typography variant="button" display="block" gutterBottom>
          Transaction Signatures
        </Typography>
        <Box bgcolor="info" p={2}>
          <TableContainer>
            <Table sx={{ width: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Signature
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" gutterBottom>
                      {transactions &&
                        transactions.certificate &&
                        transactions.certificate.txSignature}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
      <div>
        <Typography variant="button" display="block" gutterBottom>
          Aggregated Validator Signature
        </Typography>
        <Box bgcolor="info" p={2}>
          <TableContainer>
            <Table sx={{ width: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Signature
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" gutterBottom>
                      {transactions &&
                        transactions.certificate &&
                        transactions.certificate.authSignInfo &&
                        transactions.certificate.authSignInfo.signature}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
};

export default SignaturesTab;
