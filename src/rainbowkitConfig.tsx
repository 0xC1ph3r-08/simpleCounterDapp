"use client"

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet , sepolia , anvil ,  polygon, optimism , arbitrum , base  } from 'wagmi/chains';

export default getDefaultConfig({
    appName: 'CounterDapp',
    chains: [mainnet, sepolia, anvil, polygon, optimism, arbitrum, base],
    projectId:process.env.NEXT_PUBLIC_PROJECT_ID!,
    ssr: false
});