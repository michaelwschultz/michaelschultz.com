import React from 'react'
import AudioSpectrum from 'react-audio-spectrum'

const AudioVisualBlock = (): JSX.Element => {
  return (
    <section className='mw8 center mv6'>
      <h3 className='white f5 pb3'>Audio Visual</h3>
      <audio
        id='audio-element'
        style={{ width: '100%' }}
        src='/assets/compass.mp3'
        autoPlay
      ></audio>
      <AudioSpectrum
        id='audio-canvas'
        audioId={'audio-element'}
        capColor={'red'}
        capHeight={2}
        meterWidth={2}
        meterCount={512}
        meterColor={[
          { stop: 0, color: '#f00' },
          { stop: 0.5, color: '#0CD7FD' },
          { stop: 1, color: 'red' },
        ]}
        gap={4}
      />
    </section>
  )
}

export default AudioVisualBlock
