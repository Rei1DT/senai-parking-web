import styled from 'styled-components';

export const SignUpContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
`;

export const BoxTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const SignUpTitle = styled.h1`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-size: 28px;
`;

export const BoxMid = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoxBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${props => props.theme.spacing.lg};
`;
