import { Provider } from 'react-redux';
import { store } from './app/store/store';
import * as ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/firebase/firebase';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Provider store={store}><App /></Provider>);
