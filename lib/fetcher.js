const Fetcher = async function (...args) {
  const res = await fetch(...args)

  return res.json()
}

export default Fetcher
