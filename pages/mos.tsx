import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { InputType } from 'zlib'
import { checkForCommand } from '../components/mOS'
import Popover from '../components/popover'
import CLI from '../lib/cli.json'

interface LogEntry {
  input: string
  timestamp: Date
  response?: string
}
interface CliOutput {
  log?: LogEntry[]
}

const Mos = () => {
  const initialLogMessage = {
    input: 'Booting mOS...',
    timestamp: new Date(),
  }
  // TODO: move cliOutput to localStorage
  const [cliOutput, setCliOutput] = useState<LogEntry[]>([initialLogMessage])

  // stores the input value in a ref to limit number of rerenders due to state changes
  // this greatly reduces the number of child component rerenders
  const cliInputRef = useRef<HTMLInputElement>()
  const [showPopover, setShowPopover] = useState(false)

  // displays welcome message 2 seconds after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCliOutput([
        ...cliOutput,
        {
          input: 'Running v0.1.0',
          timestamp: new Date(),
        },
      ])
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  function appendCliOutput(input) {
    const sortedOutput = sortByTimestamp()

    console.log('sorted Output', sortedOutput)
    setCliOutput([
      ...sortedOutput,
      {
        input,
        timestamp: new Date(),
      },
    ])
  }

  function clearInput() {
    // clear out input ref value
    cliInputRef.current.value = null
    setShowPopover(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const { value } = cliInputRef.current

    if (!value) {
      return
    }
    const command = checkForCommand(value)

    if (command) {
      appendCliOutput(value + '\n\r' + command.description)
    } else {
      appendCliOutput(value)
    }
    clearInput()
  }

  function sortByTimestamp() {
    return cliOutput.sort((a, b) => {
      return Math.abs(
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    })
  }

  function renderCliOutput() {
    console.log('render output', sortByTimestamp().reverse())

    // reverse displays the contents of our log from bottom to top
    // bottom = most recent
    return sortByTimestamp().map((logEvent) => {
      return (
        <StyledLogEvent key={logEvent.timestamp}>
          <span>{logEvent.input}</span>
          <StyledTimestamp>
            {new Date(logEvent.timestamp).toLocaleTimeString()}
          </StyledTimestamp>
        </StyledLogEvent>
      )
    })
  }

  function handleInputChange() {
    const { value } = cliInputRef.current
    const commandExists = checkForCommand(value)

    const searchCommand = input.startsWith('/')

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
        <StyledOutputWrapper>
          <StyledOutput>{renderCliOutput()}</StyledOutput>
        </StyledOutputWrapper>
        <form onSubmit={handleSubmit} className='form'>
          <Popover show={showPopover} actions={CLI.actions} />
          <StyledInput
            type='text'
            placeholder='Add commands here'
            ref={cliInputRef}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <style jsx>{`
        .page {
          background: white;
          height: 100vh;
          padding: 40px;
        }

        .form {
          position: relative;
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
          position: relative;
          outline: 1px solid black;
          display: flex;
          flex: 1;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

const StyledOutputWrapper = styled.pre`
  position: relative;
  width: 100%;
  line-height: 21px;
  margin: 0;
  resize: none;
  outline: none;
  padding: 24px 24px 0 24px;
`

const StyledOutput = styled.div`
  display: flex;
  height: 200px;
  flex: 1;
  flex-direction: column-reverse;
  overflow-y: scroll;
  width: 100%;
  padding-right: 16px;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const StyledInput = styled.input`
  width: 100%;
  padding: 24px;
  border: none;
  outline: none;
`

const StyledLogEvent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const StyledTimestamp = styled.span`
  color: rgba(0, 0, 0, 0.3);
`

export default Mos
