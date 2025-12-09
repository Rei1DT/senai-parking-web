import styled from 'styled-components';

export const ConsultaContainer = styled.div`
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

export const Title = styled.h1`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-size: 28px;
  margin-top: ${props => props.theme.spacing.sm};
`;

export const Content = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

export const SearchSection = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.md};
`;

export const ResultsContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const ResultCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

export const ResultItem = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  margin: ${props => props.theme.spacing.xs} 0;
  
  strong {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.primaryLight};
  margin: ${props => props.theme.spacing.lg} 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xl};
  font-size: 16px;
`;
