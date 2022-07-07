import { useRouter } from 'next/router'
import { useState } from 'react'
import { Menu } from './ui/icons'

type PageNavigationProps = {
  action?: {
    label: string
    url?: string
    disabled?: boolean
  }
  title?: string
}

const PageNavigation = (props: PageNavigationProps) => {
  const router = useRouter()
  const { pid } = router.query

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuButton = (
    <button
      className='p-1 text-primary-100 mr-2'
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu />
    </button>
  )

  return (
    <>
      <aside
        className={`pt-16 w-80 -ml-80 h-screen fixed transition-transform bg-primary-800 shadow-2xl z-40 ${
          !sidebarOpen && 'translate-x-80'
        }`}
      >
        <div>Testing this thing out, {`let's`} see how it looks.</div>
      </aside>
      <div className='h-16 relative z-40'>
        <nav className='fixed w-full p-4 flex items-center justify-between backdrop-blur-sm bg-primary-700/50'>
          <div className='flex items-center'>
            {menuButton}
            {pid ||
              (props.title && (
                <h3 className='capitalize text-primary-200 font-semibold'>
                  {pid || props.title}
                </h3>
              ))}
          </div>
          {props.action && (
            <a
              href={props.action.url || ''}
              className={`py-2 px-4 text-xs ${
                props.action.disabled
                  ? 'bg-primary-600'
                  : 'bg-primary-400 border border-primary-100'
              }  rounded-full`}
            >
              {props.action.label}
            </a>
          )}
        </nav>
      </div>
    </>
  )
}

export default PageNavigation
