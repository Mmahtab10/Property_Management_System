import Home from "./components/Home";
import "./App.css";
import { createStore } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";
import ListingPage from "./components/ListingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyHome from "./components/PropertyHome";
import CustomRoutes from "./components/Routes";

function App({ signOut, user }) {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return (
    <Provider store={store}>
      <CustomRoutes />
    </Provider>
  );
}

export default App;
