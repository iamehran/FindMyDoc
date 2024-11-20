import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Inter, Montserrat } from 'next/font/google';  // You can choose different fonts

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});


export const metadata = {
  title: 'FindMyDoc',
  description: 'A simple document viewer application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
