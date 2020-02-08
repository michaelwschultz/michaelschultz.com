import React from 'react'

export interface DribbblePostProps {
  description: string,
  html_url: string,
  images: {
    hidpi: string,
  }
  title: string,
}

function DribbblePost({ post }) {
  return (
    <div className="pb5" style={{columnGap: '40px'}}>
      <div className="relative hide-child">
        <span
          className="padded-border child absolute b--white br2 h-100 w-100"
          style={{ pointerEvents: "none", zIndex: 10 }} 
        />
        <a href={post.html_url}>
          <img className="br2" src={post.images.hidpi} />
        </a>
      </div>
      <div className="white pt2">
        <h4 className="white normal">{post.title}</h4>
        <span dangerouslySetInnerHTML={{ __html: post.description }}></span>
      </div>
    </div>
  )
}
    
export default DribbblePost