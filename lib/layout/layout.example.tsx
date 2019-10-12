import React, {Fragment} from 'react';
import Layout from './layout';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Aside from './aside';

const LayoutExample: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div>
        <h1>布局一</h1>
        <Layout style={{height: '500px'}}>
          <Header>header</Header>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>布局二</h1>
        <Layout style={{height: '500px'}}>
          <Header>header</Header>
          <Layout>
            <Aside>aside</Aside>
            <Content>
              content
            </Content>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>布局三</h1>
        <Layout style={{height: '500px'}}>
          <Header>header</Header>
          <Layout>
            <Content>
              content
            </Content>
            <Aside>aside</Aside>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>布局四</h1>
        <Layout style={{height: '500px'}}>
          <Aside>aside</Aside>
          <Layout>
            <Header>header</Header>
            <Content>
              content
            </Content>
            <Footer>footer</Footer>
          </Layout>

        </Layout>
      </div>
    </Fragment>

  );
};

export default LayoutExample;