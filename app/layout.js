import './globals.css';

export const metadata = {
  title: 'Weather Dashboard',
  description: 'Weather information with Auth0 authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}