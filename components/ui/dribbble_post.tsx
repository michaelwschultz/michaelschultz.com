import React from 'react'

// export interface DribbblePostProps {
//   description: string,
//   html_url: string,
//   images: {
//     hidpi: string,
//   }
//   title: string,
// }

function DribbblePost(post) {
  return (
    <li className="w-100 w-50-m w-third-ns ph2 pb5">
      <a href={post.html_url}>
        <img className="br2 dim" src={post.images.hidpi} />
      </a>
      <div className="white pt2">
        <h4 className="white normal">{post.title}</h4>
        <span dangerouslySetInnerHTML={{ __html: post.description }}></span>
      </div>
    </li>
  )
}
    
export default DribbblePost