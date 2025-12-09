import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, Clock, CreditCard, Plus } from 'react-feather';
import toast from 'react-hot-toast';
import { getAxiosWithToken } from '../../services/api';
import GradientButton from '../../components/GradientButton';
import Sidebar from '../../components/Sidebar';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundLight};
  padding-left: 0;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding-left: 250px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background};
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 30px;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ScrollContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  padding-bottom: 120px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

const VagaItem = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  margin: ${props => props.theme.spacing.sm} 0;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.$active ? props.theme.colors.primaryLight : 'transparent'};
  transition: border 0.3s;
`;

const VagaHeader = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: transparent;
  text-align: left;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => props.theme.spacing.md};
`;

const CarImage = styled.img`
  width: 36px;
  height: 28px;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ButtonContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: center;
`;

const FloatingButtonWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  z-index: 10;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    left: calc(50% + 125px);
  }
`;

const FabButton = styled.button`
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`;

export default function ListaVagas() {
  const navigate = useNavigate();
  const [vagas, setVagas] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchVagas() {
    setIsLoading(true);
    try {
      const axiosInstance = await getAxiosWithToken();
      const response = await axiosInstance.get('/api/veiculos');
      setVagas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error?.response?.data || error.message || error);
      toast.error('Erro ao buscar vagas.');
      setVagas([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchVagas();
  }, []);

  return (
    <>
      <Sidebar />
      <Container>
        <Header>
          <Logo src="/logo.png" alt="Logo" />
          <Title>Lista de Vagas</Title>
        </Header>

        <FloatingButtonWrapper>
          <FabButton onClick={() => navigate('/entrada')}>
            <Plus width={28} height={28} color="#fff" />
          </FabButton>
        </FloatingButtonWrapper>

        <ScrollContainer>
          {isLoading ? (
            <EmptyState>Carregando...</EmptyState>
          ) : vagas.length === 0 ? (
            <EmptyState>Nenhum veículo no estacionamento</EmptyState>
          ) : (
            vagas.map((vaga, idx) => (
              <VagaItem key={idx} $active={activeIndex === idx}>
                <VagaHeader onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}>
                  <IconContainer>
                    <CarImage src="/car-image.png" alt="Car" />
                  </IconContainer>

                  <TextContainer>
                    <InfoText>
                      <CreditCard width={16} height={16} /> Placa: {vaga.placa}
                    </InfoText>
                    <InfoText>
                      <Calendar width={16} height={16} /> Data: {vaga.dataEntrada}
                    </InfoText>
                    <InfoText>
                      <Clock width={16} height={16} /> Hora: {vaga.horarioEntrada}
                    </InfoText>
                  </TextContainer>
                </VagaHeader>

                {activeIndex === idx && (
                  <ButtonContainer>
                    <GradientButton onClick={() => navigate('/saida')}>
                      Registrar Saída
                    </GradientButton>
                  </ButtonContainer>
                )}
              </VagaItem>
            ))
          )}
        </ScrollContainer>
      </Container>
    </>
  );
}
