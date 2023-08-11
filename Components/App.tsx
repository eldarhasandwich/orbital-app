
import { Button, Layout } from 'antd';

import AppContext, { AppContextContainer } from '../Contexts/AppContext';
import OrbitList from './OrbitList/OrbitList';
import LoadPremadeSystem from './LoadPremadeSystem';
import OrbitVisualisation from './OrbitVisualisation/OrbitVisualisation';
import { DARK_BLUE } from '../styles/Colours';
import GenerateTransferButton from './TransferOrbit/GenerateTransferButton';
import TimeControls from './Time/TimeControls';
import { useContext } from 'react';
import GenreateTransferUi from './TransferOrbit/GenerateTransferUi';

const { Header, Footer, Sider, Content } = Layout;

const Sidebar: React.FC = () => {

  const { isGenerateTransferOrbitPanelOpen } = useContext(AppContext)

  return (
    <Sider
      hidden={false}
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        background: DARK_BLUE
      }}
      width={400}
    >
      
      {
        (isGenerateTransferOrbitPanelOpen)
          ? (<GenreateTransferUi/>)
          : (<OrbitList/>)

      }
      
    </Sider>
  )
}

const App = () => {
  return (
      <AppContextContainer>
        <Layout>

          <Layout>
            <Header style={{ overflow: 'hidden', background: DARK_BLUE }}>

              <LoadPremadeSystem/>

              <Button disabled style={{ marginRight: "10px" }}>
                Import System
              </Button>
              <Button disabled style={{ marginRight: "10px" }}>
                Export System
              </Button>

              <GenerateTransferButton/>

            </Header>

            <Content>
              <OrbitVisualisation/>
            </Content>

            <Footer
              style={{background: DARK_BLUE, color: 'white', height: '128px'}}
            >
              <TimeControls/>
            </Footer>
          </Layout>

          <Sidebar/>

        </Layout>
      </AppContextContainer>
  );
}

export default App;
