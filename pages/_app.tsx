import type { AppProps } from "next/app";
import splitbee from "@splitbee/web";
import { ThemeContext, Themes } from "../lib/themeContext";

if (process.env.NODE_ENV === "production") {
  splitbee.init();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContext.Provider value={Themes[3]}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
