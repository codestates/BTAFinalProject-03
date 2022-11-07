import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {JsonRpcProvider, Network} from "@mysten/sui.js";
import * as React from "react";

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const GetAddr = () => {
    const addr = useParams();
    const jsonId = JSON.stringify(addr);
    const resultId = JSON.parse(jsonId);

    const [transactions, setTransactions] = useState<any>({});

    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        getTransaction(resultId.addr);
    }, [])

    const getTransaction = async (addr: string) => {
        const resultObj = await provider.getObjectsOwnedByAddress(addr);
        const resultJson = JSON.stringify(resultObj);
        const parseResult = JSON.parse(resultJson);
        setTransactions(parseResult);
    }
    console.log(transactions);

    return (
        <div className="tab_info">
            <h2>
                {
                    transactions &&
                    transactions.certificate &&
                    transactions.certificate.transactionDigest
                }
            </h2>
            <div>
                <b><h2>Owned Objects</h2></b>
                <table>
                    <tr>
                        <td>Coins</td>
                        <td>
                            {
                                transactions &&
                                transactions.certificate &&
                                transactions.certificate.data &&
                                transactions.certificate.data.sender
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default GetAddr;