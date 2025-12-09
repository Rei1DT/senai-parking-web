import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, Plus } from 'react-feather';
import toast from 'react-hot-toast';
import { getAxiosWithToken } from '../../services/api';
import GradientButton from '../../components/GradientButton';
import Sidebar from '../../components/Sidebar';
import carImage from '../../assets/images/car-image.png';
import logoImage from '../../assets/images/logo.png';
import {
  Container,
  Header,
  Logo,
  Title,
  ScrollContainer,
  VagaItem,
  VagaHeader,
  IconContainer,
  CarImage,
  TextContainer,
  InfoText,
  ButtonContainer,
  FloatingButtonWrapper,
  FabButton,
  EmptyState,
} from './style';

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
          <Logo src={logoImage} alt="Logo" />
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
                    <CarImage src={carImage} alt="Car" />
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
