import { useEffect } from 'react';

export const FAQ: React.FC = () => {
  return (
    <div>
      <h1>FAQ</h1>
      <h2>What are the advantages of using Pistis?</h2>
      <p>
        Pistis Score allows DeFi protocols to evaluate counterparty risks hence offering individuals
        personalized under-collateralized loans. Higher Pistis Score - better loan terms offered.
      </p>
      <h2>How does Pistis work?</h2>
      <p>
        Pistis permanently links on-chain and off-chain unique data sources of the persona to the
        soulbound token. These data sources are considered by the ML algorithm that calculates the
        final score. Bearing in mind that the data sources change over time Pistis Score needs to be
        recalculated just like a traditional credit score.
      </p>
      <h2>What is Pistis Token?</h2>
      <p>Pistis Token is a soulbound dynamic non-fungible token that stores the Pistis Score.</p>
      <h2>What is TradFi?</h2>
      <p>
        TradFi, or Traditional Finance, is our mainstream financial system and institution. Some
        institutions include banks, hedge funds, or brokerages for example. TradFi is characterized
        by a high degree of centralization and control.
      </p>
      <h2>How is the DeFi score calculated?</h2>
      <p>Coming soon</p>
      <h2>How is the TradFi score calculated?</h2>
      <p>Coming soon</p>
      <h2>How is Personal Score calculated?</h2>
      <p>Coming soon</p>
      <h2>What is the benefit of linking multiple addresses?</h2>
      <p>
        Linking multiple addresses can increase the length of your credit history, diversify your
        credit mix, and have other benefits that can increase your credit score.
      </p>
      <h2>Is there a limit to linking addresses?</h2>
      <p>No limit. You can link as many addresses as you wish</p>
      <h2>What blockchains are supported?</h2>
      <p>Polygon, BSC, Avalanche, Ethereum</p>
    </div>
  );
};
