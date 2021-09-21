import App from 'next/app'
import splitbee from '@splitbee/web'

if (process.env.NODE_ENV === 'production') {
  splitbee.init()
}

export default App
