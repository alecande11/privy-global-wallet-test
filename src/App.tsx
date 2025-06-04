import "./App.css";
import { useAddress, useWallet } from "@initia/react-wallet-widget";

function App() {
  const address = useAddress();
  const { onboard, view, requestTx } = useWallet();

  return (
    <div>
      {address ? (
        <button onClick={view}>{address}</button>
      ) : (
        <button onClick={onboard}>Connect</button>
      )}
    </div>
  );
}

export default App;
