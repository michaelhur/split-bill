import React from 'react';
import styled from 'styled-components';

export const OverlayWrapper = ({children, padding, minHeight}) => {
    return (
        <StyledContainer padding={padding} minHeight={minHeight}>
            {children}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  padding: ${props => props.padding || '5vw'};

  border: 1px dashed #9747FF;
  border-radius: 5px;

  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  width: 100%;
  min-height: ${props => props.minHeight || '0'};

  @media screen and (max-width: 600px) {
    padding: 6vw;
  }
`
