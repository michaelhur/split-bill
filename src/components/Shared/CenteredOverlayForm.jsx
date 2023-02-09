import React from 'react';
import styled from 'styled-components';
import {Button, Container, Form, Row} from 'react-bootstrap';
import {OverlayWrapper} from './OverlayWrapper';
import {ServiceLogo} from './ServiceLogo';

export const CenteredOverlayForm = ({title, validated, handleSubmit, children}) => {
    return (
        <>
            <CentralizedContainer>
                <ServiceLogo>Split Bill</ServiceLogo>
                <OverlayWrapper>
                    <Container>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>
                            <StyledRow>
                                <Row className="align-items-start">
                                    <StyledH2>{title}</StyledH2>
                                </Row>
                                <Row className="align-items-center">
                                    {children}
                                </Row>
                                <Row className="align-items-end">
                                    <StyledSubmitButton id="saveButton" type="submit">
                                        저장
                                    </StyledSubmitButton>
                                </Row>
                            </StyledRow>
                        </Form>
                    </Container>
                </OverlayWrapper>
            </CentralizedContainer>
        </>
    )
};

const StyledH1 = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;

  letter-spacing: 0.25px;

  color: #6610F2;
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
