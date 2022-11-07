import {JsonRpcProvider, Network} from "@mysten/sui.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const substitution = (txId: string): string => {
    return txId.replaceAll('!', '\/')
};

const SignaturesTab = () => {
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
        <div className="tab_info">
            <div>
                <b><h2>Transaction Signatures</h2></b>
                <table>
                    <tr>
                        <td>Signature</td>
                        <td>
                            {
                                transactions &&
                                transactions.certificate &&
                                transactions.certificate.txSignature
                            }
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <b><h2>Aggregated Validator Signature</h2></b>
                <table>
                    <tr>
                        <td>Signature</td>
                        <td>
                            {
                                transactions &&
                                transactions.certificate &&
                                transactions.certificate.authSignInfo &&
                                transactions.certificate.authSignInfo.signature
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default SignaturesTab;