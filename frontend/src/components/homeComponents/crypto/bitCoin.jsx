import React, { useEffect, useState } from 'react'
import { ShrinkingComponentWrapper } from '../../../styles/globalParts/containerStyles';
import {
    FormSelectWrapper,
    GraphWrapper,
    ButtonWrapper,
    CryptoWrapper
} from "../../../styles/components/cryptoStyles/bitCoinStyles";
import CandlestickCryptoIntraday from "../../charts/candlesticksCryptoIntraday";
import ChartTimeCrypto from "../../charts/chartSelectTimeCrypto";
import CandlestickCryptoHistorical from "../../charts/candlesticksCryptoHistorical";
import { TitleSpan } from '../../../styles/globalParts/textStyles';


export const BitCoin = (props) => {

    const [chartTimeframe2, setChartTimeframe2] = useState('1d');

    // const [intradayData, setIntradayData] = useState([]);
    // const [historicalData, setHistoricalData] = useState([]);

    // const symbol = ('btcusdt').toUpperCase();

    const [symbol, setSymbol] = useState('BTCUSDT');
    const [symbolInput, setSymbolInput] = useState('');

    const [allSymbols, setAllSymbols] = useState([]);

    const [stupidToggle, setStupidToggle] = useState(false);

    useEffect(() => {

        let symbolsSet = new Set();

        fetch("https://api.binance.com/api/v3/exchangeInfo")
            .then(res => res.json())
            .then(data => {
                const nonDuplicatedSymbols = data.symbols.filter(crypto => crypto['quoteAsset'] === 'USDT' &&
                    crypto.symbol.includes("USDT") &&
                    !((crypto.symbol).slice(0, 4) === 'USDT') &&
                    !crypto.symbol.includes("UPUSDT") &&
                    !crypto.symbol.includes("BULLUSDT") &&
                    !crypto.symbol.includes("BEARUSDT") &&
                    !crypto.symbol.includes("STUSDT") &&
                    !crypto.symbol.includes("DOWNUSDT") &&
                    !crypto.symbol.includes("ESUSDT")
                );
                for (const crypto of nonDuplicatedSymbols) {
                    symbolsSet.add(crypto.symbol)
                }
                symbolsSet = Array.from(symbolsSet)  //convert set to array
                setAllSymbols(symbolsSet);
            })
    }, []);

    const changeSymbol = () => {
        setSymbol(symbolInput);
        setStupidToggle(true);
    }

    useEffect(() => {
        setStupidToggle(false);
    }, [stupidToggle])

    return (
        <>
            <ShrinkingComponentWrapper>
                <FormSelectWrapper>
                    <div className="title">
                        <TitleSpan >{symbol}</TitleSpan>
                    </div>
                    <ButtonWrapper>
                        <button onClick={() => changeSymbol()}>Update</button>
                    </ButtonWrapper>
                </FormSelectWrapper>
                <CryptoWrapper>
                    <FormSelectWrapper>
                        <label htmlFor="company-input">Cryptocurrency</label>
                        <input id="company-input" placeholder={symbol==='BTCUSDT'?'BTC':(symbol).slice(0,-4)} className="selector" list="cryptoSymbols"
                               onChange={e => setSymbolInput(`${e.target.value.toUpperCase()}USDT`)}
                               style={{"textTransform":"uppercase"}}
                               required />

                        <div >
                            <ChartTimeCrypto setChart2={setChartTimeframe2} />
                        </div>
                    </FormSelectWrapper>
                    {/* <datalist id="cryptosymbols" >
                                { allSymbols && allSymbols.length !== 0 ?
                                    allSymbols.map( (symbol, index) =>
                                    <option value={symbol} key={index} />)
                                    : null
                                }
                          </datalist> */}
                </CryptoWrapper>
                <GraphWrapper>
                    {
                        chartTimeframe2 === '1d' && !stupidToggle ?
                            <CandlestickCryptoIntraday symbol={symbol} timeLength={chartTimeframe2} />
                            : ''
                    }
                    {chartTimeframe2 === '1d' ?
                        ''
                        :
                        <CandlestickCryptoHistorical symbol={symbol} timeLength={chartTimeframe2} />}
                </GraphWrapper>
            </ShrinkingComponentWrapper>
        </>
    )
}
