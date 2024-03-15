interface Work {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const workData: Work[] = [
  {
    title: 'Senisble',
    description: `Continuing my theme of building useful tools; Sensible helps you transform your documents into structured data. Lot's of businesses still use PDFs to collect and transfer data into multiple systems. At Sensible, I was focused designing and building the user interface for our ground breaking data extraction techniques. \n\nRather than companies building their own version of these tools internally, we're developing a plug-and-play platform that allows us to accept documents and return structured data tailored to each customer. Although some of the magic happens behind the scenes, our user interface allows you to have full control of what is extracted, and how. I joined the team as the 2nd hire and helped grow the team and launch our first couple of products.`,
    imgSrc: '/static/images/sensible.png',
    href: 'https://sensible.so',
  },
  {
    title: 'Newfront Insurance',
    description: `I was the second software engineer to join the team and also filled the roll as product designer until year 3. Newfront is the modern insurance brokerage. They're working hard to raise the status quo of the current insurance ecosystem and build a place that brokers can do what they do best. \n\nI helped our team design and build modern tools for account managers, brokers and our clients. This encompasses everything from product planning to designing features/marketing materials/branding to building production software that's pushed on a daily basis.`,
    imgSrc: '/static/images/newfront.png',
    href: 'https://newfront.com',
  },
  {
    title: 'Sidewire',
    description: `Instead of relying on noisy social networks to discover trending political news, quickly read top news stories and valuable insights from the community of newsmakers who know. \n\nSidewire closed it's doors in 2016.`,
    imgSrc: '/static/images/sidewire.png',
  },
  {
    title: 'Iodine',
    description: `Iodine combines massive amounts of healthcare data with user's individual needs and backgrounds to create a personalized resource for better understanding and decision-making about health. I'm working on everything from early stage mockups to final front-end development. We are a small team and we all take on multiple roles. It's fast paced, focused and rewarding. \n\nIodine merged with GoodRx in 2016, the insights people attributed to our products can still be found on goodrx.com.`,
    imgSrc: '/static/images/iodine.png',
    href: 'https://goodrx.com',
  },
]

export default workData
