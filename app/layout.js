import RootLayoutClient from "./RootLayoutClient"; //Import the rootlayout client component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
