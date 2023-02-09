import React from 'react';
import styled from 'styled-components';

export const ServiceLogo = ({children}) => {
    return (
        <StyledTitle>{children}</StyledTitle>
    );
};

const StyledTitle = styled.h1`
  font-weight: 700;
  font-size: 48px;
  line-height: 1;

  letter-spacing: 0.25px;

  color: #8C68CD;
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.3);
`
