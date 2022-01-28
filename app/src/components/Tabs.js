import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { globalState } from '../contexts/state';
import { Listing } from './Listing';

const Tab = styled.button`
  font-size: 15px;
  padding: 20px;
  cursor: pointer;
  background: white;
  border: 0;
  outline: 0;
  color: #364156;
  ${({ active }) =>
    active && `
        border-bottom: 2px solid black;
        font-weight: bold
  `}
`;

const TabsContainer = styled.div`
  display: center;
`;

const types = ['Pending Jobs', 'Completed Jobs', 'Cancelled Jobs'];

export const Tabs = ({ pendingJobs, completedJobs, cancelledJobs }) => {
  const { dispatch } = useContext(globalState);
  const [activeTab, setActiveTab] = useState(types[0]);
  const [pJobs, setPJobs] = useState(pendingJobs);
  const [cJobs, setCJobs] = useState(completedJobs);
  const [cancelledJobsList, setCancelledJobsList] = useState(cancelledJobs);

  const handleDelete = (deleteJob) => {
    let temp = pendingJobs.filter(job => job.index !== deleteJob.index);
    
    dispatch({ type: "UPDATE_PENDING_LIST", payload: temp })
    
    dispatch({ type: "ADD_CANCEL_JOB", 
        payload: {
            name: deleteJob.name,
            duration: deleteJob.duration,
            durationFormat: deleteJob.durationFormat,
            id: deleteJob.id,
            index: deleteJob.index,
            isRunning: true,
            status: "cancelled",
            progress: deleteJob.progress
        } 
    });
  }

  /*
  * These useEffects are to update the local instance
  * of the pendingJobs, completedJobs and cancelledJobs arrays
  * These useEffects are called whenever these object arrays
  * are changed in state
  * 
  * This is not really required. Down below I can directly plug in
  * the associated props. This was an oversight on my end.
  */
  useEffect(() => {
    setPJobs(pendingJobs)
  }, [pendingJobs])

  useEffect(() => {
    setCJobs(completedJobs)
  }, [completedJobs])

  useEffect(() =>{
    setCancelledJobsList(cancelledJobs)
  }, [cancelledJobs])

  return (
    <React.Fragment>
      <TabsContainer>
        {types.map(type => (
          <Tab key={type} active={activeTab === type} onClick={() => setActiveTab(type)}>
            {type}
          </Tab>
        ))}
      </TabsContainer>

      {activeTab === types[0] && pJobs && pJobs.map(job => (
        <Listing key={job.index} name={job.name} duration={job.duration} durationFormat={job.durationFormat} status={job.status} handleDelete={() => handleDelete(job)}></Listing>
      ))}
      {activeTab === types[1] && cJobs && cJobs.map(job => (
        <Listing key={job.index} name={job.name} duration={job.duration} durationFormat={job.durationFormat} status={job.status}></Listing>
      ))}
      {activeTab === types[2] && cancelledJobsList && cancelledJobsList.map(job => (
        <Listing key={job.index} name={job.name} duration={job.duration} durationFormat={job.durationFormat} status={job.status}></Listing>
      ))}
    </React.Fragment>
  );
}