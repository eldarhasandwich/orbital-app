
import { Button, Layout } from 'antd';

import { AppContextContainer } from '../Contexts/AppContext';
import OrbitList from './OrbitList/OrbitList';
import LoadPremadeSystem from './LoadPremadeSystem';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
      <AppContextContainer>
        <Layout>

          <Layout>
            <Header style={{ overflow: 'hidden' }}>

              <LoadPremadeSystem/>

              <Button disabled style={{ marginRight: "10px" }}>
                Import System
              </Button>
              <Button disabled style={{ marginRight: "10px" }}>
                Export System
              </Button>
              <Button disabled style={{ float: 'right', top: '15px' }}>
                Generate Transfer Orbit
              </Button>
            </Header>


            <Content>Draw orbits here at some point</Content>


            {/* <Footer>Footer</Footer> */}
          </Layout>

          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              left: 0
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
