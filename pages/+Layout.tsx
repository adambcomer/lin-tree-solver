import React from 'react'
import { HeroUIProvider } from '@heroui/system'

import './style.css'

import '@fontsource-variable/noto-sans'
import '@fontsource-variable/noto-sans/wght-italic.css'
import '@fontsource-variable/noto-sans-mono'
import '@fontsource-variable/material-symbols-rounded'

interface LayoutProps {
  children: React.ReactNode
}

const nav = (
  <div className='flex'>
    <div className='w-64 h-screen border-r'>
      <nav className='w-64 h-screen flex flex-col fixed'>
        <a href='/'>
          <div className='text-xl font-medium mx-4 my-4'>
            Linguistics Tree Solver
          </div>
        </a>

        <hr />

        <ul className='flex flex-col grow'>
          <a href='/sentence'>
            <div className='flex items-center p-4 hover:bg-gray-100'>
              <span className='material-symbols-rounded'>notes</span>
              <span className='ml-8'>Sentence</span>
            </div>
          </a>
          <a href='/viewer'>
            <div className='flex items-center p-4 hover:bg-gray-100'>
              <span className='material-symbols-rounded'>aspect_ratio</span>
              <span className='ml-8'>Tree Viewer</span>
            </div>
          </a>
          <a href='/rules'>
            <div className='flex items-center p-4 hover:bg-gray-100'>
              <span className='material-symbols-rounded'>gavel</span>
              <span className='ml-8'>Syntax Rules</span>
            </div>
          </a>

          <div className='grow' />

          <a href='/support'>
            <div className='flex items-center p-4 hover:bg-gray-100'>
              <span className='material-symbols-rounded'>help</span>
              <span className='ml-8'>Support Pages</span>
            </div>
          </a>
        </ul>
      </nav>
    </div>
    <div className='flex-1'></div>
  </div>
)

export const Layout = ({ children }: LayoutProps) => {
  return (
    <HeroUIProvider>
      <div className='max-w-screen-2xl mx-auto p-4'>{children}</div>
    </HeroUIProvider>
  )
}
