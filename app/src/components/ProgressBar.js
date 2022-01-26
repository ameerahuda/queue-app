import React from "react";
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    background: #CDCDCD;
    height: 20px;
    width: 50%;
    border-radius: 50px;
    margin: 10px;
    display: inline-block;
`

const Bar = styled.div`
    background: #011638;
    height: 100%;
    width: ${({prog}) => (prog ? prog : 0)}%;
    border-radius: 10px;
    text-align: center;
    transition: 1s ease-out;
`

const Label = styled.span`
    padding: 10px;
    color: white;
`

export const ProgressBar = ({ progress }) => {
    return (
        <ProgressBarContainer>
            <Bar prog={progress}>
                <Label>{`${progress}%`}</Label>
            </Bar>
        </ProgressBarContainer>
    );
};