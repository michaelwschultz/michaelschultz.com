import React, { useState, useEffect } from 'react'
import { checkForCommand } from '../components/mOS'
import Popover from '../components/popover'
import CLI from '../lib/cli.json'

const Mos = () => {
  const [cliOutput, setCliOutput] = useState('Booting mOS...')
  const [cliInput, setCliInput] = useState('')
  const [showPopover, setShowPopover] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCliOutput(cliOutput + '\n\r' + 'Running v0.1.0')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  function appendCliOutput(input) {
    console.log('input', input)
    setCliOutput(cliOutput + '\n\r' + input)
  }

  function clearInput() {
    setCliInput('')
    setShowPopover(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const command = checkForCommand(cliInput)

    if (command) {
      appendCliOutput(
        cliInput +
          '\n\r<pre style="color: red">' +
          command.description +
          '</pre>'
      )
    } else {
      appendCliOutput(cliInput)
    }
    clearInput()
  }

  function handleChange(input) {
    setCliInput(input)
    const commandExists = checkForCommand(input)

    if (commandExists) {
      setShowPopover(true)
    } else {
      setShowPopover(false)
    }
  }

  return (
    <div className='page'>
      <div className='outlined-box'>
        <div className='outlined-box-label'>mOS</div>
        <pre className='cli-output'>
          <span>{cliOutput}</span>
        </pre>
        <form onSubmit={handleSubmit} className='form'>
          <Popover show={showPopover} actions={CLI.actions} />
          <input
            type='text'
            placeholder='Add commands here'
            value={cliInput}
            onChange={(event) => handleChange(event.target.value)}
          />
        </form>
      </div>

      <style jsx>{`
        .page {
          background: white;
          height: 100vh;
          padding: 40px;
        }

        .cli-output {
          width: 100%;
          line-height: 21px;
          margin: 0;
          vertical-align: baseline;
          resize: none;
          outline: none;
          display: flex;
          flex: 1;
          padding: 24px 24px 0 24px;
        }

        .cli-output span {
          align-self: flex-end;
        }

        .form {
          position: relative;
        }

        input {
          width: 100%;
          padding: 24px;
          border: none;
          outline: none;
        }

        .outlined-box-label {
          position: absolute;
          top: 0;
          left: 0;
          margin: -8px 0 0 16px;
          color: black;
          background: white; // variable for page background color
          padding: 8px;
        }

        .outlined-box {
          min-height: 400px;
          position: relative;
          outline: 1px solid black;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

export default Mos
