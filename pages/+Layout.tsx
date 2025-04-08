import React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/toast'

import './style.css'

import '@fontsource-variable/noto-sans'
import '@fontsource-variable/noto-sans/wght-italic.css'
import '@fontsource-variable/noto-sans-mono'
import '@fontsource-variable/material-symbols-rounded'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <div className='max-w-screen-2xl mx-auto p-4'>{children}</div>
    </HeroUIProvider>
  )
}
