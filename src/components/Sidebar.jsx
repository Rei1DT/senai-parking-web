import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, Home, LogOut, Search, ArrowRightCircle, ArrowLeftCircle } from 'react-feather';
import { removeToken } from '../services/api';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${props => props.$isOpen ? '250px' : '0'};
  background-color: ${props => props.theme.colors.cardBackground};
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;
  border-right: 1px solid ${props => props.theme.colors.primaryLight};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 250px;
  }
`;

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.primaryLight};
`;

const SidebarTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MenuList = styled.nav`
  padding: ${props => props.theme.spacing.lg} 0;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.theme.colors.primary};
  }

  svg {
    flex-shrink: 0;
  }
`;

const MenuButton = styled.button`
  position: fixed;
  top: ${props => props.theme.spacing.lg};
  left: ${props => props.theme.spacing.lg};
  z-index: 999;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 999;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/lista-vagas', label: 'Lista de Vagas', icon: Home },
    { path: '/entrada', label: 'Registrar Entrada', icon: ArrowRightCircle },
    { path: '/saida', label: 'Registrar Saída', icon: ArrowLeftCircle },
    { path: '/consulta', label: 'Consultar Veículos', icon: Search },
  ];

  return (
    <>
      <MenuButton onClick={toggleSidebar}>
        <Menu size={24} />
      </MenuButton>

      <Overlay $isOpen={isOpen} onClick={toggleSidebar} />

      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Menu</SidebarTitle>
          <CloseButton onClick={toggleSidebar}>
            <X size={24} />
          </CloseButton>
        </SidebarHeader>

        <MenuList>
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              $active={location.pathname === item.path}
            >
              <item.icon size={20} />
              {item.label}
            </MenuItem>
          ))}
          
          <MenuItem onClick={handleLogout}>
            <LogOut size={20} />
            Sair
          </MenuItem>
        </MenuList>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
