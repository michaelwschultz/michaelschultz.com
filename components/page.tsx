interface PageProps {
  children: any;
}

const Page = (props: PageProps) => {
  return <div className="wrapper ph3">{props.children}</div>;
};

export default Page;
