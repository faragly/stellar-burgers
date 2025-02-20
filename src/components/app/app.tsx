import { AppHeader, AppContent } from '@components';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';

import store from '../../services/store';
import { BASE_URL } from '../../constants';

import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <BrowserRouter basename={BASE_URL}>
    <Provider store={store}>
      <div className={styles.app}>
        <AppHeader />
        <AppContent />
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
