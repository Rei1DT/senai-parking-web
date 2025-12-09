import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundLight};
  padding-left: 0;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding-left: 250px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background};
`;

export const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 30px;
  margin-top: ${props => props.theme.spacing.sm};
`;

export const ScrollContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  padding-bottom: 120px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

export const VagaItem = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  margin: ${props => props.theme.spacing.sm} 0;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.$active ? props.theme.colors.primaryLight : 'transparent'};
  transition: border 0.3s;
`;

export const VagaHeader = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: transparent;
  text-align: left;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => props.theme.spacing.md};
`;

export const CarImage = styled.img`
  width: 36px;
  height: 28px;
`;

export const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

export const InfoText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

export const ButtonContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: center;
`;

export const FloatingButtonWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  z-index: 10;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    left: calc(50% + 125px);
  }
`;

export const FabButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(1, 98, 227, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`;
