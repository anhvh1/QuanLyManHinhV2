import React, {Component} from 'react';
import {connect, useSelector} from 'react-redux';
import {Layout, ConfigProvider, Button} from 'antd';
import {IntlProvider} from 'react-intl';
import {Debounce} from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import {ThemeProvider} from 'styled-components';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Notification from '../Notification/notification';
import Topbar from '../Topbar/Topbar';
import ThemeSwitcher from '../../containers/ThemeSwitcher';
import AppRouter from './AppRouter';
import {siteConfig} from '../../settings';
import logo from './go.png';
// import {AppLocale} from '../../dashApp';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import './global.css';
import GlobalStyle from './globalStyle';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import Wrapper from './App.styled';
import ImgCrop from 'antd-img-crop';
// import './antd4.css';

const {Content, Footer} = Layout;
const {logout} = authAction;
const {toggleAll} = appActions;

export class App extends Component {
  stripTrailingSlash = (str) => {
    if (str.substr(-1) === '/') {
      return str.substr(0, str.length - 1);
    }
    return str;
  };


  render() {
    const {url} = this.props.match;
    // const urlOrigin = this.stripTrailingSlash(url);
    const {locale, selectedTheme, height, width, ListMenuActive} = this.props;
    const appHeight = window.innerHeight;

    return (
      <Wrapper>
        <ConfigProvider
        // locale={currentAppLocale.antd}
        >
          <IntlProvider
          // locale={currentAppLocale.locale}
          // messages={currentAppLocale.messages}
          >
            <ThemeProvider theme={themes[selectedTheme]}>
              <AppHolder>
                <GlobalStyle />
                <Layout style={{height: appHeight}} className={'outerLayout'}>
                  <Debounce time="1000" handler="onResize">
                    <WindowResizeListener
                      onResize={(windowSize) =>
                        this.props.toggleAll(
                          windowSize.windowWidth,
                          windowSize.windowHeight,
                        )
                      }
                    />
                  </Debounce>
                 <Topbar url={url} /> 
                  <Layout
                    style={{flexDirection: 'row', overflowX: 'hidden'}}
                    className={'middleLayout'}
                  >
                   <Sidebar url={url} /> 
                    {/* <Sidebar url={url} /> */}
                    <Notification url={url} />
                    <Layout
                      className="isoContentMainLayout"
                      style={{
                        height: height,
                      }}
                    >
                      <Content
                        className="isomorphicContent"
                        style={{
                          padding:  '55px 0px 35px 0',
                          display: 'grid',
                          gridTemplateColumns: ListMenuActive?.length
                            ? '11% 89%'
                            : '100%',
                          overflow: 'auto',
                        }}
                      >
                        <div
                          className="wrapper-content"
                          // style={{
                          //   width: ListMenuActive?.length ? '89%' : '100',
                          // }}
                        >
                          <AppRouter style={{height: '100%'}} url={url} />
                        </div>
                      </Content>

                        <Footer
                          style={{
                            background: '#fafafa',
                            textAlign: 'center',
                            borderTop: '1px solid #ededed',
                            padding: '10px 50px',
                          }}
                        >
                         <img src={logo} style={{width:"50px",height:"30px"}} alt="Footer" /><span style={{marginTop:"10px",marginLeft:"10px"}}>{siteConfig.footerText}</span>
                        </Footer>
                    </Layout>
                  </Layout>
                  {/*<ThemeSwitcher />*/}
                </Layout>
              </AppHolder>
            </ThemeProvider>
          </IntlProvider>
        </ConfigProvider>
      </Wrapper>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height,
    width: state.App.width,
    isViewIframe: state.App.isViewIframe,
    ListMenuActive: state.App.ListMenuActive,
  }),
  {logout, toggleAll},
)(App);
