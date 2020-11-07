import React, { useState, useEffect } from 'react'

type Action = {
  id: number
  label: string
  description: string
}

interface Props {
  show: boolean
  actions: Action[] // fix this
}

const Popover = (props: Props) => {
  const { show, actions } = props
  const [showPopover, setShowPopover] = useState(false)

  useEffect(() => {
    if (show) {
      setShowPopover(true)
    } else {
      setShowPopover(false)
    }
  }, [show])

  if (!showPopover) {
    return null
  }

  const listItems = () => {
    const items = Object.entries(actions)

    return items.map(([actionType, action]) => {
      return (
        <li key={action.id}>
          <h5>{action.label}</h5>
          <p>{action.description}</p>

          <style jsx>{`
            list-style: none;

            li:not(:last-child) {
              padding: 0 0 8px 0;
            }
            h5 {
              font-size: 14px;
              margin: 0;
            }
            p {
              font-size: 12px;
            }
          `}</style>
        </li>
      )
    })
  }

  return (
    <>
      <div className='popover'>
        <h4>Command list</h4>
        <ul>{listItems()}</ul>
      </div>
      <style jsx>{`
        .popover {
          position: absolute;
          border: 1px solid rgba(0, 0, 0, 0.8);
          padding: 16px;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
          bottom: 0;
          left: 0;
          margin: 0 0 64px 24px;
          line-height: 24px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(2px);
        }

        h4 {
          margin: 0;
          padding-bottom: 8px;
        }

        .popover ul {
          margin: 0;
          padding: 0;
          min-width: 148px;
          max-width: 300px;
        }

        .popover ul li {
          list-style: none;
          line-height: 21px;
        }
      `}</style>
    </>
  )
}

export default Popover
