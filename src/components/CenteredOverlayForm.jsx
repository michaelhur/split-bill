import React from 'react';
import styled from 'styled-components';
import {Container} from 'react-bootstrap';
import {OverlayWrapper} from './Shared/OverlayWrapper';

export const CenteredOverlayForm = ({children}) => {
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

