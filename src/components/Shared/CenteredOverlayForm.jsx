import React from 'react';
import styled from 'styled-components';
import {Button, Container, Row} from 'react-bootstrap';
import {OverlayWrapper} from './OverlayWrapper';

export const CenteredOverlayForm = ({title, children}) => {
    return (
        <>
            <CentralizedContainer>
                <StyledHeader>Dutch Pay</StyledHeader>
                <OverlayWrapper>
                    {children}
                </OverlayWrapper>
            </CentralizedContainer>
        </>
    )
};

const StyledHeader = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;

  letter-spacing: 0.25px;
  
  color: #212121;
`

const CentralizedContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
    
    width: 50%;
    min-height: 100vh;
`


export const StyledH2 = styled.h2`
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`

export const StyledSubmitButton = styled(Button).attrs({type: 'submit'})`
  background: #6610F2;
  border-radius: 8px;
  border: none;

  &:hover {
    background: #6610F2;
    filter: brightness(80%)
  }
`
export const StyledRow = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 60vh;
`
