import { createGlobalStyle } from "styled-components";
import { palette } from "styled-theme";
import { transition } from "../../settings/style-util";

export default createGlobalStyle`
  .popupSubMenuInline  .ant-menu-item-active {
      background: ${palette("primary", 21)} !important;
  }
  .nav-text {
      font-size: 16px;
      color: #666 !important;
      ${transition()};
      display: inline-block; /* Đảm bảo hiệu ứng hoạt động đúng */
      transition: transform 0.3s ease-in-out, color 0.3s ease; /* Hiệu ứng mượt cho cả transform và màu */
  }
  .nav-text:hover {
    color: #ff6b00 !important;  
    transform: translateX(5px); /* Dịch chữ sang phải 5px */
  }
  .ant-menu-item-selected > .isoMenuHolder .nav-text,
  .ant-menu-item-selected > a .nav-text {
    color: #ff6b00 !important;
  }
  .ant-menu-submenu-selected > .ant-menu-submenu-title .nav-text {
    color: #ff6b00 !important;
  }
      .cPRnUO .isomorphicSidebar .isoDashboardMenu .ant-menu-submenu-inline .ant-menu-inline > .ant-menu-item:not(.ant-menu-item-group):not(.ant-menu-item-selected):hover a, .cPRnUO .isomorphicSidebar .isoDashboardMenu .ant-menu-submenu-vertical .ant-menu-inline > .ant-menu-item:not(.ant-menu-item-group):not(.ant-menu-item-selected):hover a, .cPRnUO .isomorphicSidebar .isoDashboardMenu .ant-menu-submenu-inline .ant-menu-submenu-vertical > .ant-menu-item:not(.ant-menu-item-group):not(.ant-menu-item-selected):hover a, .cPRnUO .isomorphicSidebar .isoDashboardMenu .ant-menu-submenu-vertical .ant-menu-submenu-vertical > .ant-menu-item:not(.ant-menu-item-group):not(.ant-menu-item-selected):hover a {
    color: rgb(0, 0, 0) !important;
}
  .popupSubMenuInline .ant-menu-item-selected {
    background-color: ${palette("hover", 0)} !important;
  }
  .ant-menu-submenu > .ant-menu {
    background-color: ${palette("primary", 14)};
    
    &:active {
      background-color: ${palette("primary", 15)};
    }
    
    .ant-menu-submenu {
    
      @media only screen and (max-width: 500px) {
        display: none;
      }
      
      .ant-menu-submenu-title {
        .isoMenuHolder {
          align-items: center;
          color: #FFF;

          i {
            font-size: 19px;
            color: inherit;
            margin: 0 15px 0 0;
            width: 18px;
            ${transition()};
          }
        }
      }
    }
    
    .ant-menu-item {
      @media only screen and (max-width: 500px) {
        display: none;
      }
      .isoMenuHolder {
        align-items: center;
        color: #FFF;

        i {
          font-size: 19px;
          color: inherit;
          margin: 0 15px 0 0;
          width: 18px;
          ${transition()};
        }
      }
    }
  }
  
 
  
  .ant-menu-item-selected > a, .ant-menu-item-selected > a:hover {
    color: #FFF;
  }
  
  .ant-menu-item > a {
    color: #FFF;
    
    &:hover {
      color: #FFF;
      font-weight: bold;
    }
  }
  

  .ant-collapse>.ant-collapse-item >.ant-collapse-header >.ant-collapse-header-text {
    flex: none;
  }
  
  .ant-select-dropdown-menu {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #bfc4cd;
        border-radius: 4px;
    }
  }
  
  .ant-select-tree-dropdown .ant-select-dropdown-search {
    top: -5px;
  }
  
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: #e6f7ff !important;
  }
  
  .ant-select-disabled {
    color: rgba(0, 0, 0, 0.65);
  }
  
  .kkts-tooltip {
    .ant-tooltip-content {
      .ant-tooltip-inner {
        color: #222;
        background-color: rgba(255, 255, 255, 0.9);
        width: 500px;
        border: solid 1px #999;
      }
    }
  }
  /* .ant-form-item-label {
    display: flex;
    align-items: center;
  } */
  /// table antd

`;
