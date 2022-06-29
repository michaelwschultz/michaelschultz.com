
import { Lazy } from 'react-lazy'

const Soundcloud = () => {
  return (
    <section className='mw8 center mt6'>
      <h3 className='white f5 pb3'>Music I've made</h3>
      <Lazy>
        <iframe
          width='100%'
          title='Michael Schultz music via Soundcloud'
          height='450'
          frameBorder='no'
          scrolling='no'
          allow='autoplay'
          src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1291667&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
        />
      </Lazy>
    </section>
  )
}

export default Soundcloud
