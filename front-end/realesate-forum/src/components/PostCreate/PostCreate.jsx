import React, { Fragment } from "react"

const PostCreate = () => {
  return (
    <a href='/post-create-page' className='tt-btn-create-topic'>
      <span className='tt-icon'>
        <svg>
          <use xlinkHref='#icon-create_new'></use>
        </svg>
      </span>
    </a>
  )
}

export default PostCreate
