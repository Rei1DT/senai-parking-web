import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, Eye } from 'react-feather';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL, setToken } from '../../services/api';
import InputField from '../../components/InputField';
import GradientButton from '../../components/GradientButton';
import Logo from '../../components/Logo';

const LoginContainer = styled.div`
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

const LoginTitle = styled.h1`
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
  gap: ${props => props.theme.spacing.md};
`;

const RegisterLink = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  text-decoration: underline;
  margin-top: ${props => props.theme.spacing.sm};
  
  &:hover {
    color: ${props => props.theme.colors.primaryLight};
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email,
        senha: password,
      });
      const token = response.data.token;
      setToken(token);
      toast.success('Login realizado com sucesso!');
      navigate('/lista-vagas');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <LoginContainer>
      <BoxTop>
        <Logo />
        <LoginTitle>Login</LoginTitle>
      </BoxTop>

      <BoxMid>
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
        <GradientButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </GradientButton>

        <RegisterLink onClick={() => navigate('/cadastro')}>
          Não tem uma conta? Cadastre-se
        </RegisterLink>
      </BoxBottom>
    </LoginContainer>
  );
}
