import "./App.css";
import { useStore } from "./redux/store";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";

function App(props) {
  const store = useStore(props.initialReduxState);

  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
