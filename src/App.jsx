import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './components/Feed';
import DetalleProducto from './components/DetalleProducto';
import { AuthProvider } from './context/authContext'; // No le hagan caso a este error XD
import AddProduct from './components/AddProduct';
import ParentComponent from './components/ComponentePadre';
import Perfil from './components/Perfil';
import PerfilSeguir from './components/PerfilSeguir';
import Chat from './pages/Chat';
import PrivateChat from './pages/PrivateChat';
import Notifications from './pages/Notifications';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */

setupIonicReact();

const App = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/feed">
            {/* <Home /> */}
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          {/* <Route path="/chat" component={Chat} exact={true}/> */}
          <Route path="/feed" component={Feed} exact={true} />
          <Route path="/producto" component={DetalleProducto} exact={true} />
          <Route path="/perfil" component={Perfil} exact />
          <Route path="/perfil-seguir" component={PerfilSeguir} exact />
          {/* <Route exact path="/" render={() => <Redirect to="/perfil" />} /> */}
          <Route path="/chat" render={(props) => <Chat {...props.location.state} />}/>
          <Route path="/agregar-producto" component={ParentComponent} />
          <Route path="/private-chat" component={PrivateChat} />
          <Route path="/notifications" component={Notifications} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);



export default App;
