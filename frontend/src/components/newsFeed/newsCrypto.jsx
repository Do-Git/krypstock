import React, {useEffect, useState} from 'react';
import {ShrinkingComponentWrapper} from "../../styles/globalParts/containerStyles";
import {NewsWrapper} from "../../styles/components/stockStyles/newsStyles";
import {iexAPIKey, iexSandboxKey} from "../../store/constants";

const NewsCrypto = (props) => {

    const [allNews, setAllNews] = useState([]);

    const last = '5';

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        const API_Call = `https://sandbox.iexapis.com/stable/stock/${props.symbol}/news/last/${last}?token=${iexSandboxKey}`;

        fetch(API_Call)
            .then(res => res.json())
            .then(data => {
                setAllNews(data);
            });
    }

    return (
        <>
            <h3>Latest news about {props.symbol}</h3>
            {allNews.length > 0 ? allNews.map((news, index) => {

                const date = new Date(news.datetime);

                const dateOptions = {
                    weekday: 'long',
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }

                const stringDate = date.toLocaleString('en-US', dateOptions);

                return (
                    <ShrinkingComponentWrapper key={index}>
                        <NewsWrapper onClick={()=> window.open(news.url, "_blank")}>
                            <h3>{news.headline}</h3>
                            <p className='news_date'>{stringDate} - By {news.source}</p>
                        </NewsWrapper>
                    </ShrinkingComponentWrapper>
                )
            })
            : ''
            }
        </>
    )
}

export default NewsCrypto