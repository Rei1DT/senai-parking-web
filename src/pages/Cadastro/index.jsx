import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Eye } from 'react-feather';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../services/api';
import InputField from '../../components/InputField';
import GradientButton from '../../components/GradientButton';
import Logo from '../../components/Logo';
import {
  SignUpContainer,
  BoxTop,
  SignUpTitle,
  BoxMid,
  BoxBottom,
} from './style';

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
