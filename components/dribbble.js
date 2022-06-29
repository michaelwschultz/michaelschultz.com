import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Alert from './ui/alert'
import Button from './ui/button'
import DribbblePost from './ui/dribbble_post'

function Dribbble() {
  const SHOTS_PER_PAGE = 9

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isError, setIsError] = useState(false)
  const [postsFetched, setPostsFetched] = useState(false)
  const [dribbblePage, setDribbblePage] = useState(1)
  const [dribbblePosts, setDribbblePosts] = useState([])

  const placeholderArr = Array.from({ length: SHOTS_PER_PAGE }, (_v, i) => i)

  useEffect(() => {
    let didCancel = false
    let dribbbleRes = {}

    async function getDribbblePosts() {
      try {
        if (!postsFetched) {
          dribbbleRes = await axios.get(
            `https://api.dribbble.com/v2/user/shots?access_token=${process.env.NEXT_PUBLIC_DRIBBBLE_TOKEN}&page=${dribbblePage}&per_page=${SHOTS_PER_PAGE}`
          )
          setPostsFetched(true)
        }

        if (!didCancel) {
          setDribbblePosts([...dribbblePosts, ...dribbbleRes.data])

          if (isLoading) setIsLoading(false)
          if (isLoadingMore) setIsLoadingMore(false)
        }
      } catch (error) {
        console.warn(error)
        if (!didCancel) {
          if (isLoading) setIsLoading(false)
          if (isLoadingMore) setIsLoadingMore(false)
          setPostsFetched(true)
          setIsError(true)
        }
      }
    }

    if (!postsFetched && !didCancel) {
      getDribbblePosts()
    }

    return () => {
      didCancel = true
    }
  }, [
    dribbblePosts,
    postsFetched,
    dribbblePage,
    isLoading,
    isError,
    isLoadingMore,
  ])

  function loadMorePosts() {
    setDribbblePage(dribbblePage + 1)
    setPostsFetched(false)
    setIsLoadingMore(true)
  }

  return (
    <div className='mw8 center'>
      {isError && (
        <Alert>
          Sorry, something went wrong... refresh the page or come back later.
        </Alert>
      )}

      {isLoading &&
        placeholderArr.map((i) => (
          <div key={i} style={{ background: 'white' }} />
        ))}
      {!isLoading && (
        <div className='mt5 grid'>
          {dribbblePosts.map((post) => (
            <DribbblePost key={post.id} post={post} />
          ))}
        </div>
      )}

      {isLoadingMore && placeholderArr.map((i) => <div key={i} />)}

      <div className='tc mv4'>
        <Button
          onClick={loadMorePosts}
          isLoading={isLoading || isLoadingMore}
        >
          Load More
        </Button>
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

          grid-gap: 1rem;
        }
      `}</style>
    </div>
  )
}

export default Dribbble
