import styled from 'styled-components';

const LogoImage = styled.img`
  width: 35vw;
  max-width: 200px;
  height: auto;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

function Logo({ ...props }) {
  return <LogoImage src="/logo.png" alt="Senai Parking Logo" {...props} />;
}

export default Logo;
