
import { Button, Layout, Dropdown, Menu } from 'antd';
import { DownOutlined, StarTwoTone, RocketTwoTone } from '@ant-design/icons';

import { AppContextContainer } from '../Contexts/AppContext';
import OrbitList from './OrbitList';


const { Header, Footer, Sider, Content } = Layout;

const menu = (
  <Menu
    // onClick={handleMenuClick}
    items={[
      {
        label: 'Solar System',
        key: '1',
        icon: <StarTwoTone />,
      },
      {
        label: 'Kerbol System',
        key: '2',
        icon: <RocketTwoTone />,
      }
    ]}
  />
);

const App = () => {
  return (
      <AppContextContainer>
        <Layout>

          <Layout>
            <Header style={{ overflow: 'hidden' }}>

              <Dropdown overlay={menu}>
                <Button style={{ marginRight: "10px" }}>
                  Load Premade System
                  <DownOutlined />
                </Button>
              </Dropdown>

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
