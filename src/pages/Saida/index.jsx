import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck } from 'react-feather';
import toast from 'react-hot-toast';
import { getAxiosWithToken } from '../../services/api';
import InputField from '../../components/InputField';
import GradientButton from '../../components/GradientButton';
import Logo from '../../components/Logo';
import Sidebar from '../../components/Sidebar';
import {
  ExitContainer,
  BoxTop,
  ExitTitle,
  BoxMid,
  BoxBottom,
} from './style';

export default function Saida() {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExit = async () => {
    if (!placa) {
      toast.error('Digite a placa do veículo');
      return;
    }

    setIsLoading(true);
    try {
      const axiosInstance = await getAxiosWithToken();
      const response = await axiosInstance.put('/api/veiculos/saida', {
        placa,
      });
      
      // Exibir informações do valor pago se disponível
      const valorPago = response.data?.veiculo?.valorPago;
      if (valorPago) {
        toast.success(`Saída liberada! Valor a pagar: R$ ${valorPago.toFixed(2)}`);
      } else {
        toast.success('Saída liberada com sucesso!');
      }
      
      setTimeout(() => navigate('/lista-vagas'), 1500);
    } catch (error) {
      console.error('Erro ao registrar saída:', error?.response?.data || error.message || error);
      toast.error('Erro ao registrar saída. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleExit();
    }
  };

  return (
    <>
      <Sidebar />
      <ExitContainer>
        <BoxTop>
          <Logo />
          <ExitTitle>Registrar Saída</ExitTitle>
        </BoxTop>

        <BoxMid>
          <InputField
            label="Placa do Veículo"
            placeholder="Digite a placa (ex: ABC-1234)"
            Icon={Truck}
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
          />
        </BoxMid>

        <BoxBottom>
          <GradientButton onClick={handleExit} disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
          </GradientButton>
        </BoxBottom>
      </ExitContainer>
    </>
  );
}
