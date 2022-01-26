import React from 'react';
import styled from 'styled-components';
import { Trash } from '@styled-icons/boxicons-solid/Trash';
import { ClipboardCheckmark } from '@styled-icons/fluentui-system-regular/ClipboardCheckmark';
import { Cancel } from '@styled-icons/material-outlined/Cancel';

const Container = styled.div`
    display: flex;
    padding: 5px 20px;
    align-items: center;
    border-bottom: 1px solid #CDCDCD;
    margin-left: 20%;
    margin-right: 20%;
`;

const Description = styled.div`
    text-align: left;
    flex: auto;
`

const NameLabel = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #011638;
`

const DurationLabel = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #011638;
    margin-top: 20px;
`

const StatusPending = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: orange;
`

const StatusComplete = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: green;
`

const StatusCancel = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: red;
`

const TrashIcon = styled(Trash)`
    color: #011638;
    width: 25px;
    padding: 0px 10px;
    margin-bottom: 10px;
    cursor: pointer;
`

const CheckMarkIcon = styled(ClipboardCheckmark)`
    color: green;
    width: 25px;
    padding: 0px 10px;
    margin-bottom: 10px;
`

const CancelIcon = styled(Cancel)`
    color: red;
    width: 25px;
    padding: 0px 10px;
    margin-bottom: 10px;
`

export const Listing = ({ name, duration, durationFormat, status, handleDelete }) => {
    return (
        <Container>
            <Description>
                <NameLabel>{name}</NameLabel>
                <DurationLabel>{duration} {durationFormat}</DurationLabel>
                {status === 'pending' &&
                    <StatusPending>Pending</StatusPending>
                }
                {status === 'complete' &&
                    <StatusComplete>Complete</StatusComplete>
                }
                {status === 'cancelled' &&
                    <StatusCancel>Cancelled</StatusCancel>
                }
            </Description> 
            {status === 'pending' &&
                <TrashIcon onClick={handleDelete}></TrashIcon>
            }
            {status === 'complete' &&
                <CheckMarkIcon></CheckMarkIcon>
            }
            {status === 'cancelled' &&
                <CancelIcon></CancelIcon>
            }
        </Container>
    );
};
