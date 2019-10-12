import * as React from 'react';
import * as ReactDom from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';

ReactDom.render(
  <Router>
    <div>
      <header>
        <div className="logo">The-One</div>
      </header>
    </div>
    <div>
      <aside>
        <h2>组件</h2>
        <ul>
          <li>
            <Link to="/icon">Icon</Link>
          </li>
          <li>
            <Link to="/button">Button</Link>
          </li>
          <li>
            <Link to="/dialog">对话框</Link>
          </li>
          <li>
            <Link to="/layout">Layout</Link>
          </li>
        </ul>
      </aside>
      <main>
        <Route path="/icon" component={IconExample}/>
        <Route path="/button" component={ButtonExample}/>
        <Route path="/dialog" component={DialogExample}/>
        <Route path="/layout" component={LayoutExample}></Route>
      </main>
    </div>
  </Router>,
  document.querySelector('#root'));