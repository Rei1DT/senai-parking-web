import { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'react-feather';
import toast from 'react-hot-toast';
import { getAxiosWithToken } from '../../services/api';
import InputField from '../../components/InputField';
import GradientButton from '../../components/GradientButton';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';

const ConsultaContainer = styled.div`
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

const Title = styled.h1`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-size: 28px;
  margin-top: ${props => props.theme.spacing.sm};
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const SearchSection = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.md};
`;

const ResultsContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const ResultItem = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  margin: ${props => props.theme.spacing.xs} 0;
  
  strong {
    color: ${props => props.theme.colors.primary};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.primaryLight};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xl};
  font-size: 16px;
`;

export default function Consulta() {
  const [id, setId] = useState('');
  const [placa, setPlaca] = useState('');
  const [resultId, setResultId] = useState(null);
  const [resultPlaca, setResultPlaca] = useState([]);
  const [isLoadingId, setIsLoadingId] = useState(false);
  const [isLoadingPlaca, setIsLoadingPlaca] = useState(false);

  const buscarPorId = async () => {
    if (!id) {
      toast.error('Digite um ID para buscar');
      return;
    }

    setIsLoadingId(true);
    setResultId(null);
    try {
      const axiosInstance = await getAxiosWithToken();
      const res = await axiosInstance.get(`/api/veiculos/id/${id}`);
      setResultId(res.data);
      toast.success('Veículo encontrado!');
    } catch (e) {
      console.error('Erro na consulta por ID:', e);
      toast.error('Não encontrado ou erro na consulta por ID.');
    } finally {
      setIsLoadingId(false);
    }
  };

  const buscarPorPlaca = async () => {
    if (!placa) {
      toast.error('Digite uma placa para buscar');
      return;
    }

    setIsLoadingPlaca(true);
    setResultPlaca([]);
    try {
      const axiosInstance = await getAxiosWithToken();
      const res = await axiosInstance.get(`/api/veiculos/placa/${placa}`);
      setResultPlaca(res.data);
      if (res.data.length > 0) {
        toast.success(`${res.data.length} registro(s) encontrado(s)!`);
      } else {
        toast.error('Nenhum registro encontrado para esta placa.');
      }
    } catch (e) {
      console.error('Erro na consulta por placa:', e);
      toast.error('Não encontrado ou erro na consulta por placa.');
    } finally {
      setIsLoadingPlaca(false);
    }
  };

  const handleKeyPressId = (e) => {
    if (e.key === 'Enter') {
      buscarPorId();
    }
  };

  const handleKeyPressPlaca = (e) => {
    if (e.key === 'Enter') {
      buscarPorPlaca();
    }
  };

  return (
    <>
      <Sidebar />
      <ConsultaContainer>
        <Header>
          <Logo />
          <Title>Consultar Veículos</Title>
        </Header>

        <Content>
          {/* Busca por ID */}
          <SearchSection>
            <SectionTitle>Buscar por ID</SectionTitle>
            <InputField
              label="ID do Registro"
              placeholder="Digite o ID"
              Icon={Search}
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyPress={handleKeyPressId}
            />
            <ButtonContainer>
              <GradientButton onClick={buscarPorId} disabled={isLoadingId}>
                {isLoadingId ? 'Buscando...' : 'Buscar por ID'}
              </GradientButton>
            </ButtonContainer>
          </SearchSection>

          {/* Resultado da busca por ID */}
          {resultId && (
            <ResultsContainer>
              <SectionTitle>Resultado por ID</SectionTitle>
              <ResultCard>
                <ResultItem><strong>Placa:</strong> {resultId.placa}</ResultItem>
                <ResultItem><strong>Data Entrada:</strong> {resultId.dataEntrada}</ResultItem>
                <ResultItem><strong>Horário Entrada:</strong> {resultId.horarioEntrada}</ResultItem>
                {resultId.dataSaida && (
                  <>
                    <ResultItem><strong>Data Saída:</strong> {resultId.dataSaida}</ResultItem>
                    <ResultItem><strong>Horário Saída:</strong> {resultId.horarioSaida}</ResultItem>
                    <ResultItem><strong>Valor Pago:</strong> R$ {resultId.valorPago?.toFixed(2)}</ResultItem>
                  </>
                )}
              </ResultCard>
            </ResultsContainer>
          )}

          <Divider />

          {/* Busca por Placa */}
          <SearchSection>
            <SectionTitle>Buscar por Placa</SectionTitle>
            <InputField
              label="Placa do Veículo"
              placeholder="Digite a placa (ex: ABC-1234)"
              Icon={Search}
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPressPlaca}
            />
            <ButtonContainer>
              <GradientButton onClick={buscarPorPlaca} disabled={isLoadingPlaca}>
                {isLoadingPlaca ? 'Buscando...' : 'Buscar por Placa'}
              </GradientButton>
            </ButtonContainer>
          </SearchSection>

          {/* Resultado da busca por Placa */}
          {resultPlaca.length > 0 && (
            <ResultsContainer>
              <SectionTitle>Histórico da Placa ({resultPlaca.length} registros)</SectionTitle>
              {resultPlaca.map((registro, index) => (
                <ResultCard key={index}>
                  <ResultItem><strong>Registro #{index + 1}</strong></ResultItem>
                  <ResultItem><strong>Placa:</strong> {registro.placa}</ResultItem>
                  <ResultItem><strong>Data Entrada:</strong> {registro.dataEntrada}</ResultItem>
                  <ResultItem><strong>Horário Entrada:</strong> {registro.horarioEntrada}</ResultItem>
                  {registro.dataSaida && (
                    <>
                      <ResultItem><strong>Data Saída:</strong> {registro.dataSaida}</ResultItem>
                      <ResultItem><strong>Horário Saída:</strong> {registro.horarioSaida}</ResultItem>
                      <ResultItem><strong>Valor Pago:</strong> R$ {registro.valorPago?.toFixed(2)}</ResultItem>
                    </>
                  )}
                </ResultCard>
              ))}
            </ResultsContainer>
          )}

          {(resultId === null && resultPlaca.length === 0) && (
            <EmptyState>
              Use os campos acima para buscar informações de veículos por ID ou Placa
            </EmptyState>
          )}
        </Content>
      </ConsultaContainer>
    </>
  );
}
