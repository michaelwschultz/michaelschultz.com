import { useRouter } from 'next/router'
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

  const menuButton = (
    <button className='p-1 text-primary-100 mr-2'>
      <Menu />
    </button>
  )

  return (
    <div className='h-16'>
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
  )
}

export default PageNavigation
