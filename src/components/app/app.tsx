import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router';

const AppContent = () => (
  <div className={styles.app}>
    <AppHeader />
    <ConstructorPage />
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppContent />} />
    </Routes>
  </BrowserRouter>
);


export default App;
