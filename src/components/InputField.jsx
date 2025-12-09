import styled from 'styled-components';

export const InputFieldContainer = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const LabelText = styled.label`
  font-size: 14px;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  display: block;
  margin-left: 2%;
`;

export const BoxInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.inputBorder};
  background-color: ${props => props.theme.colors.inputBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.xs};
  width: 90vw;
  max-width: 500px;

  svg {
    margin-left: ${props => props.theme.spacing.sm};
    flex-shrink: 0;
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  background: transparent;
  border: none;
  padding: ${props => props.theme.spacing.sm};

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

function InputField({ label, placeholder, Icon, type = "text", ...props }) {
  return (
    <InputFieldContainer>
      <LabelText>{label}</LabelText>
      <BoxInput>
        <StyledInput
          type={type}
          placeholder={placeholder}
          autoCapitalize="none"
          {...props}
        />
        {Icon && <Icon width={40} height={30} stroke="black" />}
      </BoxInput>
    </InputFieldContainer>
  );
}

export default InputField;
