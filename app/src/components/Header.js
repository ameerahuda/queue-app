import React, { useState, useEffect, useContext } from 'react';
import { globalState } from '../contexts/state';
import styled from 'styled-components';
import { AddToQueue } from '@styled-icons/boxicons-regular/AddToQueue';
import { Refresh } from '@styled-icons/boxicons-regular/Refresh';
import { Modal } from './Modal';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { HourglassEmpty } from '@styled-icons/material-rounded/HourglassEmpty';


const HeaderMain = styled.div`
    padding: 20px 30px;
    background-color: #dff8eb;
`

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
`;

const HeaderName = styled.span`
    color: #214e34;
    font-weight: bold;
`

const AddIcon = styled(AddToQueue)`
    color: #214e34;
    width: 25px;
    padding: 0px 10px;
    cursor: pointer;
`

const RefreshIcon = styled(Refresh)`
    color: #214e34;
    width: 30px;
    padding: 0px 10px;
    cursor: pointer;
`

const Form = styled.div`
    display: block;
    width: 300px;
    margin: 50px auto;
`

const FormLabel = styled.label`
    display: block;
    width: 100%;
    color: #214e34;
    padding-bottom: 5px;
`

const FormInput = styled.input`
    padding: 0.5em;
    border: 1px solid;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 20px;
`

const ModalLabel = styled.div`
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #214e34;
`
const ButtonContainer = styled.span`
    display: flex;
    padding: 20px 30px;
    background-color: #dff8eb;
    justify-content: space-between;
`;

const Error = styled.div`
    margin-top: 10px;
    font-size: 12px;
    color: #c02537 !important;
    margin-bottom: 10px;
    font-weight: bold;
    color: #214e34;
`

const CurrentJobContainer = styled.div`
    text-align:center;
`

const CurrentJobLabel = styled.div`
    margin-bottom: 0;
`

const CurrentJobHeading = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #214E34;
`

const HourglassEmptyIcon = styled(HourglassEmpty)`
    color: #214e34;
    width: 25px;
    padding: 0px 10px;
    cursor: pointer;
`

export const Header = ({ workingItem, workingItemProgress, size }) => {
    const { dispatch } = useContext(globalState);
    const [currentSize, setCurrentSize] = useState(size);
    const [openModal, setOpenModal] = useState(false);
    const [jobName, setJobName] = useState('');
    const [jobDuration, setJobDuration] = useState(0);
    const [durationFormat, setDurationFormat] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        if (jobName.length < 1 || jobDuration < 0 || !durationFormat) {
            setError(true)
        } else {
            e.preventDefault();

            const newQueueJob = {
                name: jobName,
                duration: jobDuration,
                durationFormat: durationFormat,
                id: "",
                index: currentSize + 1,
                isRunning: false,
                status: "pending",
                progress: 0
            };
            
            dispatch({ type: "ADD_JOB", payload: newQueueJob });
            setCurrentSize(currentSize+1)
            setOpenModal(false);
            setJobName('');
            setJobDuration(0);
            setDurationFormat('');
        }
    };

    const handleRefresh = () => {
        dispatch({ type: "REFRESH" });
    }

    useEffect(() => {
        dispatch({ type: "UPDATE_SIZE", payload: currentSize });
        // eslint-disable-next-line
    }, [currentSize])

    useEffect(() => {
        if (!jobName.match(/^([A-Za-z0-9 ]*)$/)) {
            setError(true);
        } else if (jobDuration !== 0 && !(/^[0-9.]\d*(\.\d*)?$/).test(jobDuration)) {
            setError(true);
        } else {
            setError(false);
        }
    }, [jobName, jobDuration])

    return (
        <React.Fragment>
            <Modal isOpen={openModal} handleClose={() => setOpenModal(false)}>
            <ModalLabel>Add a Job</ModalLabel>
                <Form>
                    <FormLabel htmlFor="label">Enter Job Name</FormLabel>
                    <FormInput id="label" pattern='[A-Za-z0-9]' value={jobName} onChange={(e) => setJobName(e.target.value)}/>
                    <FormLabel htmlFor="label">Enter Job Duration</FormLabel>
                    <FormInput id="label" pattern='[0-9]' value={jobDuration} onChange={(e) => setJobDuration(e.target.value)}/>
                    
                    <FormLabel htmlFor="label">Enter Duration Format</FormLabel>
                    <input type="radio" id="minutes" name="duration_format" value="Minutes" checked={durationFormat === "Minutes"} onClick={() => setDurationFormat("Minutes")}/>
                    <label htmlFor="minutes">Minutes</label>
                    <input type="radio" id="seconds" name="duration_format" value="Seconds" checked={durationFormat === "Seconds"} onClick={() => setDurationFormat("Seconds")}/>
                    <label htmlFor="seconds">Seconds</label>
                </Form>
                {error && <Error>
                    Please check the following:
                    <br></br>
                    Name is alphanumeric
                    <br></br>
                    Duration is numeric and greater than 0
                    <br></br>
                    A Format is selected
                </Error>}
                <ButtonContainer>
                    <Button primary={false} handleClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button primary={true} handleClick={handleSubmit}>Submit</Button>
                </ButtonContainer>
            </Modal>
            
            <HeaderMain>
                <HeaderContainer>
                    <HeaderName>3DPrintQueue</HeaderName>
                    <span>
                        <AddIcon onClick={() => setOpenModal(true)}></AddIcon>
                        <RefreshIcon onClick={() => handleRefresh()}></RefreshIcon>
                    </span>
                </HeaderContainer>
                <CurrentJobHeading>Current Running Job</CurrentJobHeading>
                {workingItem ? 
                    <CurrentJobContainer>
                        <CurrentJobLabel>{workingItem.name}</CurrentJobLabel>
                        <ProgressBar progress={workingItemProgress}></ProgressBar>
                    </CurrentJobContainer>
                :
                <HourglassEmptyIcon></HourglassEmptyIcon>
                }
            </HeaderMain>
        </React.Fragment>
    )
}