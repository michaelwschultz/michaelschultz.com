import React from 'react'

function DribbblePost({key, post}) {
  return (
    <li class="w-100 w-50-m w-third-ns ph2 pb5" key={key}>
      <a href={post.html_url}>
        <img className="br2 dim" src={post.images.hidpi} />
      </a>
      <div class="white pt2">
        <h4 class="white normal">{post.title}</h4>
        <span dangerouslySetInnerHTML={{ __html: post.description }}></span>
      </div>
    </li>
  )
}
    
export default DribbblePost