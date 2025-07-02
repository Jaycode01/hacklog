import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <link
        rel="shortcut icon"
        href="../../public/images/hacklog-logo.png"
        type="image/x-icon"
      />
      <title>Hacklog - Work with accountability.</title>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
