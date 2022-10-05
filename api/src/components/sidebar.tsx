import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaCartPlus, FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiPackage } from "react-icons/fi";
import { RiHandHeartLine, RiPencilLine, RiPriceTag3Line } from "react-icons/ri";
import { BiCog, BiAddToQueue } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Header = () => {
  
    const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Olá" : "Olá, Administrador!"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}><Link to="/">
                Inicio
                </Link></MenuItem>
              <MenuItem icon={<FaList />}>Categorias</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Favoritos</MenuItem>
              <MenuItem icon={<FaCartPlus />}><Link to="/criacao-produto">Cadastro de Produtos</Link></MenuItem>
              <MenuItem icon={<RiHandHeartLine />}><Link to="/criacao-servico">Cadastro de Serviços</Link></MenuItem>
              <MenuItem icon={<FiPackage />}><Link to="/criacao-pacote">Cadastro de Pacotes</Link></MenuItem>
              <MenuItem icon={<RiPriceTag3Line />}><Link to="/criacao-promocao">Cadastro de Promoções</Link></MenuItem>
              <MenuItem icon={<BiCog />}>Configurações</MenuItem>
              <MenuItem icon={<FiLogOut />}><Link to="/login">Sair</Link></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <p>Termos de Uso</p>
              <p>Politica de Privacidade</p>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
