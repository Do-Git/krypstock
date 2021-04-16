import React from 'react'
import styled from "styled-components";
import FolderIcon from '@material-ui/icons/Folder';
import { ShrinkingComponentWrapper } from '../../styles/globalParts/containerStyles';
import { useSelector } from "react-redux";



const IconTitle = styled.div`
    display: flex;
    align-items: center;
    h3{
        margin-left: 20px;
        margin-top: 15px;
        a{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
`;

export const PortfolioCollectionBasic = () => {

    const portfolioData = useSelector(state => state.portfoliosReducer.portfolios);

    return (
        <>
            {
                portfolioData.map((portfolio, index) => {
                    return (<ShrinkingComponentWrapper key={index}>
                        <IconTitle>
                            <FolderIcon fontSize="large" />
                            <h3><a href={`https://krypstock.propulsion-learn.ch/portfolio/${portfolio.id}`}>{portfolio.name}</a></h3>
                        </IconTitle>
                    </ShrinkingComponentWrapper>)
                })
            }
        </>
    )
}
