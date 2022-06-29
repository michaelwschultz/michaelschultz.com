interface PageProps {
  children: any
}

const Page = (props: PageProps) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Page
