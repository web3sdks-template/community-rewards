import { ChainId, Web3sdksProvider } from "@web3sdks/react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  return (
    <Web3sdksProvider desiredChainId={activeChainId}>
      {/* Next Auth Session Provider */}
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>web3sdks Community Rewards Example</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </Web3sdksProvider>
  );
}

export default MyApp;
