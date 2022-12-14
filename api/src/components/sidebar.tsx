import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaCartPlus, FaList, FaRegHeart, FaDollarSign } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiPackage } from "react-icons/fi";
import { RiHandHeartLine, RiPriceTag3Line } from "react-icons/ri";
import { BiCog, BiAddToQueue, BiListUl } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";

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
              <MenuItem active={true} icon={<FiHome />}><Link to="/">Home</Link></MenuItem>
              {/*<MenuItem icon={<FaList />}>Categorias</MenuItem>*/}
              <MenuItem icon={<RiPriceTag3Line />}><Link to="/criacao-produto">Cadastros</Link></MenuItem>
              <MenuItem icon={<FaList />}><Link to="/listagens">Listagens</Link></MenuItem>
              {/*<MenuItem icon={<BiCog />}>Configurações</MenuItem>*/}
              <MenuItem icon={<FiLogOut />}><Link to="/login">Logout</Link></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <p>Termos de Uso</p>
              <p>Política de Privacidade</p>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
