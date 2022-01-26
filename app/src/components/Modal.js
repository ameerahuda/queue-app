import React from 'react';
import styled from 'styled-components';

const ModalBox = styled.div`
    z-index: auto;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width:100%;
    background: rgba(0,0,0,0.5);
    display: ${({show}) => (show ? 'block' : 'none')};
`;

const ModalContent = styled.section`
    position: fixed;
    background: white;
    width: 40%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
`


export const Modal = ({ isOpen, handleClose, children }) => {

    return (
        <ModalBox show={isOpen}>
            <ModalContent>
                {children}
            </ModalContent>
        </ModalBox>
    );
};
