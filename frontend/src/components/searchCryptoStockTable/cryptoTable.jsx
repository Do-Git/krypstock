import React from 'react'
// import {Table, TableWrapper } from '../../styles/pages/searchStyles'
// import TablePagination from '@material-ui/core/TablePagination';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AddBoxIcon from "@material-ui/icons/AddBox";
import {useHistory} from "react-router-dom";



export const CryptoTable = ({symbol}) => {

    const history = useHistory();

    const toSymbolPage = () => {
        history.push(`/crypto/${symbol.symbol}`);
    }

    return (
        <>
        {
            <tr>
            <td className="headcol"><AddBoxIcon className="addIcon"/></td>
            <td onDoubleClick={() => toSymbolPage()}>{symbol.symbol}</td>
            <td>{symbol.lastPrice}</td>
            <td>{symbol.priceChange}</td>
            <td>{symbol.priceChangePercent}</td>
            <td>{symbol.volume}</td>
            {/*<td><TrendingUpIcon/> {symbol.highPrice}</td>*/}
            </tr>
        }
    </>
    )
}
