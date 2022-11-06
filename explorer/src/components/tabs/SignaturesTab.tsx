const SignaturesTab = () => {
    return (
        <div className="tab_info">
            <div>
                <b><h2>Transaction Signatures</h2></b>
                <table>
                    <tr>
                        <td>Signature</td>
                        <td>Signature DATA</td>
                    </tr>
                </table>
            </div>
            <div>
                <b><h2>Aggregated Validator Signature</h2></b>
                <table>
                    <tr>
                        <td>Signature</td>
                        <td>Signature DATA</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default SignaturesTab;