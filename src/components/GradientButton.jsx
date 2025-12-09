import styled from 'styled-components';

export const Button = styled.button`
  width: 80vw;
  max-width: 400px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.primaryGradientStart},
    ${props => props.theme.colors.primaryGradientEnd}
  );
  border: 2px solid ${props => props.theme.colors.primaryLight};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(1, 98, 227, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonText = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
`;

function GradientButton({ children, onClick, disabled, ...props }) {
  return (
    <Button onClick={onClick} disabled={disabled} {...props}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}

export default GradientButton;
