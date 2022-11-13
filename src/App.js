import MyRoutes from "./routes/routes";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor } from "./store/store";
import store from "./store/store";

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <MyRoutes />
      </Provider>
    </PersistGate>
  );
}

export default App;
