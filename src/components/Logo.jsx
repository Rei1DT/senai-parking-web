import styled from 'styled-components';
import logoImage from '../assets/images/logo.png';

const LogoImage = styled.img`
  width: 35vw;
  max-width: 200px;
  height: auto;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

function Logo({ ...props }) {
  return <LogoImage src={logoImage} alt="Senai Parking Logo" {...props} />;
}

export default Logo;
