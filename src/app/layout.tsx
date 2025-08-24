import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./providers";
import { ReactNode } from "react";
import { Header } from "./components/Header";



export const metadata: Metadata = {
  title: "Counter Dapp",
};

export default function RootLayout(props: {children: ReactNode} ){
  return(
    <html lang="en">
      <body>
        <Provider>
          <Header />
          {props.children}
        </Provider>
      </body>
    </html>
  )
}