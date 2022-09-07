
import { Button, Layout } from 'antd';

import { AppContextContainer } from '../Contexts/AppContext';
import OrbitList from './OrbitList/OrbitList';
import LoadPremadeSystem from './LoadPremadeSystem';
import OrbitVisualisation from './OrbitVisualisation/OrbitVisualisation';
import { DARK_BLUE } from '../styles/Colours';
import GenerateTransferOrbit from './TransferOrbit/GenerateTransferOrbit';

const { Header, Footer, Sider, Content } = Layout;

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

              <GenerateTransferOrbit/>
              
            </Header>

            <Content>
              <OrbitVisualisation/>
            </Content>

            <Footer
              style={{background: DARK_BLUE, color: 'white'}}
            >
              Gonna put some time controls here or something
            </Footer>
          </Layout>

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
            <OrbitList/>
          </Sider>

        </Layout>
      </AppContextContainer>
  );
}

export default App;
