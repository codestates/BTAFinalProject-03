import React from 'react';
import './HistoryItem.css';
import moment from 'moment';

const HistoryItem = ({data}) => {
    const openRecipent = () => {
        window.navigator.clipboard.writeText(data.transaction_digest).then(() => {
            alert("COPY TO BOARD");
            if (!confirm("Go To Sui Explorer")) {

            } else {
                window.open(`https://explorer.devnet.sui.io/transactions/${data.transaction_digest}`, '_blank')
            }
        });
    }
    
    return (
        <div className="HistoryItem" onClick={openRecipent}>
            <div className='history-digest'>{data.transaction_digest}</div>
            <div className='history-inner-box'>
                <div>Method</div>
                <div className='history-type'>{data.method_name}</div>
            </div>
            <div className='history-inner-box'>
                <div>Type</div>
                <div className='history-type'>{data._flag}</div>
            </div>
            <div className='history-inner-box'>
                <div>Recipients</div>
                <div className='history-recipients'>{data._recipients}</div>
            </div>
            <div className='history-inner-box'>
                <div>Amount</div>
                <div className='history-amount'>{data._amount}</div>
            </div>
            <div className='history-inner-box'>
                <div>TotalGasFee</div>
                <div className='history-gas'>{data._gas}</div>
            </div>
            <div className='history-inner-box'>
                <div>Date</div>
                <div className='history-date'>{moment(data.timestamp).format('YYYY-MM-DD')}</div>
            </div>
        </div>
    );
};

export default HistoryItem;
