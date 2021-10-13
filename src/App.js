import "./App.css";
import { useStore } from "./redux/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";

function App(props) {
  const store = useStore(props.initialReduxState);

  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
