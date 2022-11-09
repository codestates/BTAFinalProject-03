import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {JsonRpcProvider, Network} from "@mysten/sui.js";
import * as React from "react";

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const GetObj = () => {
    const objId = useParams();
    const jsonId = JSON.stringify(objId);
    const resultId = JSON.parse(jsonId);

    const [transactions, setTransactions] = useState<any>({});

    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        getTransaction(resultId.objId);
    }, [])

    const getTransaction = async (objId: string) => {
        const resultObj = await provider.getObject(objId);
        const resultJson = JSON.stringify(resultObj);
        const parseResult = JSON.parse(resultJson);
        setTransactions(parseResult);
    }
    console.log(transactions);

    return (
        <div className="tab_info">
            <h3>Object</h3>
            <h2>
                {
                    transactions &&
                    transactions.details &&
                    transactions.details.data &&
                    transactions.details.data.fields &&
                    transactions.details.data.fields.id &&
                    transactions.details.data.fields.id.id
                }
            </h2>
            <div>
                <b><h2>Description</h2></b>
                <table>
                    <tr>
                        <td>Type</td>
                        <td>
                            {
                                transactions &&
                                transactions.details &&
                                transactions.details.data &&
                                transactions.details.data.type
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Object ID</td>
                        <td>
                            {
                                transactions &&
                                transactions.details &&
                                transactions.details.data &&
                                transactions.details.data.fields &&
                                transactions.details.data.fields.id &&
                                transactions.details.data.fields.id.id
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Last Transaction ID</td>
                        <td>
                            {
                                transactions &&
                                transactions.details &&
                                transactions.details.previousTransaction
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td>
                            {
                                transactions &&
                                transactions.details &&
                                transactions.details.reference &&
                                transactions.details.reference.version
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Owner</td>
                        <td>
                            {
                                transactions &&
                                transactions.details &&
                                transactions.details.owner &&
                                transactions.details.owner.AddressOwner
                            }
                        </td>
                    </tr>
                </table>
                <b><h2>Properties</h2></b>
                <table>
                    <tr>
                        <td>
                            balance</td>
                        <td>
                            {
                                transactions &&
                                transactions.details &&
                                transactions.details.data &&
                                transactions.details.data.fields &&
                                transactions.details.data.fields.balance
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default GetObj;