import '../globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'My App',
    description: 'Built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-500 text-white text-xl font-bold">My App</header>
        <main className="p-6">{children}</main>
        <footer className="p-4 bg-blue-100 text-center">© 2025</footer>
        </body>
        </html>
    );
}
