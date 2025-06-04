import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WalletWidgetProvider } from "@initia/react-wallet-widget";
import { toPrivyWalletProvider } from "@privy-io/cross-app-connect";

const GLOBAL_APP_ID = "cmbevh1e30022l80nhp974z8m";

const provider = toPrivyWalletProvider({
  providerAppId: GLOBAL_APP_ID,
  chains: [
    {
      id: 1,
      name: "Ethereum",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        default: { http: ["https://ethereum-rpc.publicnode.com"] },
      },
    },
  ],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletWidgetProvider
      additionalWallets={[
        {
          type: "evm",
          name: "Privy auth",
          logo: "",
          getProvider: () => ({
            on: provider.on.bind(provider),
            request: async (...params) => {
              console.log("Request params:", params);
              // @ts-expect-error
              const result = await provider.request(...params);
              console.log("Request result:", result);
              return result;
            },
          }),
        },
      ]}
    >
      <App />
    </WalletWidgetProvider>
  </StrictMode>
);
