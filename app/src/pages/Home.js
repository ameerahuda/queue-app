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

    /*
    *   The following useEffects are structured to in the order that they 
    *   would be triggered as the contents of the former useEffect updates
    *   the property in the dependecy array of the next useEffect.
    * 
    *   Due to these being tied was what drove me towards using useEffects
    *   more often than callback functions during this version of the 
    *   implementation.
    */

    /*
    *   This useEffect is triggered whenever the size property in 
    *   state changes. This will allow for the queue to update 
    *   and allow for the next job to start running if the current 
    *   job completed.
    */
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

    /*
    *   This useEffect is triggered whenever the completedJobs array in 
    *   state changes. This will allow for the queue to update 
    *   and allow for the next job to start running if the current 
    *   job completed.
    * 
    *   This can probably be combined with the above useEffect, 
    *   since it has a similar purpose.
    * 
    *   I was running into an issue where the same job was repeatedly 
    *   running. By depending on the completedJobs array to trigger 
    *   the next job to run worked best for my implementation with 
    *   the progression of the next pieces of the functionality.
    */
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

    /*
    *   This useEffect updates the pendingJobs array in state.
    * 
    *   In the above useEffects, I am updating the currentJob so that it 
    *   can be correctly displayed on the UI. I am using this local property
    *   to trigger the update of the pendingArray when needed so the list in 
    *   the UI can be updated.
    */
    useEffect(() => {
        let temp = pendingJobs.filter(job => job.index !== currentJob.index);
        dispatch({ type: "UPDATE_PENDING_LIST", payload: temp })
        // eslint-disable-next-line
    }, [currentJob])

    /*
    *   This useEffect keeps triggers the currentJob to begin running. It also 
    *   causes the progressBar to keep updating. 
    * 
    *   The issue I mentioned above of the same jobs repeatedly running 
    *   was partially being triggered from the initial version of this 
    *   useEffect as well, therefore updated this piece to have the correct
    *   queue functionality.
    */
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