import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User, Mail, Eye } from 'react-feather';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../services/api';
import InputField from '../../components/InputField';
import GradientButton from '../../components/GradientButton';
import Logo from '../../components/Logo';

const SignUpContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
`;

const BoxTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SignUpTitle = styled.h1`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  font-size: 28px;
`;

const BoxMid = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${props => props.theme.spacing.lg};
`;

export default function Cadastro() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        nome: name,
        email: email,
        senha: password,
      });
      toast.success('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Erro no cadastro:', error?.response?.data || error.message || error);
      toast.error('Erro ao fazer cadastro. Verifique suas credenciais e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <SignUpContainer>
      <BoxTop>
        <Logo />
        <SignUpTitle>Cadastro</SignUpTitle>
      </BoxTop>

      <BoxMid>
        <InputField
          label="Nome Completo"
          placeholder="Seu Nome"
          Icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <InputField
          label="Email"
          placeholder="Digite seu e-mail"
          Icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <InputField
          label="Senha"
          placeholder="Digite sua senha"
          Icon={Eye}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </BoxMid>

      <BoxBottom>
        <GradientButton onClick={handleSignUp} disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </GradientButton>
      </BoxBottom>
    </SignUpContainer>
  );
}
