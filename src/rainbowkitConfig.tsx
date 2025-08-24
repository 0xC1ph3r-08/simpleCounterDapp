"use client"

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export default getDefaultConfig({
    appName: 'CounterDapp',
    chains: [sepolia],
    projectId:process.env.NEXT_PUBLIC_PROJECT_ID!,
    ssr: false
});