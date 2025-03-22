import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "../src/store/store.js";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
