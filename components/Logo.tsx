import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center justify-between">
      <div className="mr-1">
        <Image src="/static/images/ms.svg" alt="logo" width="31" height="24" priority />
      </div>
    </div>
  )
}
