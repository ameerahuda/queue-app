import React, { useEffect, useContext, useState } from "react";
import { globalState } from '../contexts/state';
import styled from 'styled-components';
import { Header } from "../components/Header";
import { Tabs } from "../components/Tabs";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Home = () => {
    const { state, dispatch } = useContext(globalState);
    const { pendingJobs, size, workingItem, completedJobs, completedSize, cancelledJobs, workingItemProgress } = state;
    const [currentJob, setCurrentJob] = useState(null);

    useEffect(() => {
        if (size > 0 && !workingItem && pendingJobs) {
            setCurrentJob({
                name: pendingJobs[0].name,
                duration: pendingJobs[0].duration,
                durationFormat: pendingJobs[0].durationFormat,
                id: pendingJobs[0].id,
                index: pendingJobs[0].index,
                isRunning: true,
                status: "printing",
                progress: pendingJobs[0].progress
            });
            dispatch({ type: "UPDATE_WORKING_ITEM", payload: pendingJobs[0] });
        }
        // eslint-disable-next-line
    }, [size])

    useEffect(() => {
        if (pendingJobs.length > 0) {
            setCurrentJob({
                name: pendingJobs[0].name,
                duration: pendingJobs[0].duration,
                durationFormat: pendingJobs[0].durationFormat,
                id: pendingJobs[0].id,
                index: pendingJobs[0].index,
                isRunning: true,
                status: "printing",
                progress: pendingJobs[0].progress
            });
            dispatch({ type: "UPDATE_WORKING_ITEM", payload: pendingJobs[0] });
        } else {
            dispatch({ type: "UPDATE_WORKING_ITEM", payload: null });
        }
        // eslint-disable-next-line
    }, [completedJobs])

    useEffect(() => {
        let temp = pendingJobs.filter(job => job.index !== currentJob.index);
        dispatch({ type: "UPDATE_PENDING_LIST", payload: temp })
        // eslint-disable-next-line
    }, [currentJob])

    useEffect(() => {
        if (workingItem && completedJobs.filter(job => job.index === workingItem.index).length === 0) {
            let timer = workingItem.durationFormat === "Minutes" ? workingItem.duration * 60000 : workingItem.duration * 1000;
            setTimeout(() => {
                dispatch({ type: "UPDATE_COMPLETED_SIZE", payload: completedSize+1 });
                
                dispatch({ type: "ADD_COMPLETE_JOB", 
                    payload: {
                        name: workingItem.name,
                        duration: workingItem.duration,
                        durationFormat: workingItem.durationFormat,
                        id: workingItem.id,
                        index: workingItem.index,
                        isRunning: true,
                        status: "complete",
                        progress: workingItem.progress
                    } 
                });
            }, timer)

            var i = 1;
            var interval = setInterval(() => {
                if (i < 10) {
                    dispatch({ type: "UPDATE_WORKING_ITEM_PROGRESS", payload: i*10 });
                } else {
                    clearInterval(interval);
                    dispatch({ type: "UPDATE_WORKING_ITEM_PROGRESS", payload: 0 })
                }
                i++;
            }, timer/10)
        }
        // eslint-disable-next-line
    }, [workingItem])

    return (
        <React.Fragment>
            <Container>
                <Header workingItem={workingItem} workingItemProgress={workingItemProgress} size={size}></Header>
                <Tabs pendingJobs={pendingJobs} completedJobs={completedJobs} cancelledJobs={cancelledJobs}></Tabs>
            </Container>
        </React.Fragment>
    )
}