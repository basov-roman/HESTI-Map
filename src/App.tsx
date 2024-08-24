import { Provider } from "react-redux";
import MainWrapper from "./components/MainWrapper/MainWrapper";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper />
    </Provider>
  );
};

export default App;
