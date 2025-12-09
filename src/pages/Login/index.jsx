import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye } from 'react-feather';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL, setToken } from '../../services/api';
import InputField from '../../components/InputField';
import GradientButton from '../../components/GradientButton';
import Logo from '../../components/Logo';
import {
  LoginContainer,
  BoxTop,
  LoginTitle,
  BoxMid,
  BoxBottom,
  RegisterLink,
} from './style';

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
