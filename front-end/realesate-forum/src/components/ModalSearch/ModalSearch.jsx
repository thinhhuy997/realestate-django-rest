import React from "react"

const ModalSearch = () => {
  return (
    <div
      className='modal fade'
      id='modalAdvancedSearch'
      tabIndex='-1'
      role='dialog'
      aria-label='myModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-sm'>
        <div className='modal-content'>
          <div className='tt-modal-advancedSearch'>
            <div className='tt-modal-title'>
              <i className='pt-icon'>
                <svg>
                  <use xlinkHref='#icon-advanced_search'></use>
                </svg>
              </i>
              Advanced Search
              <a className='pt-close-modal' href='#' data-dismiss='modal'>
                <svg className='icon'>
                  <use xlinkHref='#icon-cancel'></use>
                </svg>
              </a>
            </div>
            <form className='form-default'>
              <div className='form-group'>
                <i className='pt-customInputIcon'>
                  <svg className='tt-icon'>
                    <use xlinkHref='#icon-search'></use>
                  </svg>
                </i>
                <input
                  type='text'
                  name='name'
                  className='form-control pt-customInputSearch'
                  id='searchForum'
                  placeholder='Search all forums'
                />
              </div>
              <div className='form-group'>
                <label for='searchName'>Posted by</label>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  id='searchName'
                  placeholder='Username'
                />
              </div>
              <div className='form-group'>
                <label for='searchCategory'>In Category</label>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  id='searchCategory'
                  placeholder='Add Category'
                />
              </div>
              <div className='checkbox-group'>
                <input type='checkbox' id='searcCheckBox01' name='checkbox' />
                <label for='searcCheckBox01'>
                  <span className='check'></span>
                  <span className='box'></span>
                  <span className='tt-text'>Include all tags</span>
                </label>
              </div>
              <div className='form-group'>
                <label>Only return topics/posts that...</label>
                <div className='checkbox-group'>
                  <input type='checkbox' id='searcCheckBox02' name='checkbox' />
                  <label for='searcCheckBox02'>
                    <span className='check'></span>
                    <span className='box'></span>
                    <span className='tt-text'>I liked</span>
                  </label>
                </div>
                <div className='checkbox-group'>
                  <input type='checkbox' id='searcCheckBox03' name='checkbox' />
                  <label for='searcCheckBox03'>
                    <span className='check'></span>
                    <span className='box'></span>
                    <span className='tt-text'>are in my messages</span>
                  </label>
                </div>
                <div className='checkbox-group'>
                  <input type='checkbox' id='searcCheckBox04' name='checkbox' />
                  <label for='searcCheckBox04'>
                    <span className='check'></span>
                    <span className='box'></span>
                    <span className='tt-text'>I’ve read</span>
                  </label>
                </div>
              </div>
              <div className='form-group'>
                <select className='form-control' id='searchTop'>
                  <option>any</option>
                  <option>value 01</option>
                  <option>value 02</option>
                  <option>value 03</option>
                </select>
              </div>
              <div className='form-group'>
                <label for='searchaTopics'>Where topics</label>
                <select className='form-control' id='searchaTopics'>
                  <option>any</option>
                  <option>value 01</option>
                  <option>value 02</option>
                  <option>value 03</option>
                </select>
              </div>
              <div className='form-group'>
                <label for='searchAdvTime'>Posted</label>
                <div className='row'>
                  <div className='col-6'>
                    <select className='form-control'>
                      <option>any</option>
                      <option>value 01</option>
                      <option>value 02</option>
                      <option>value 03</option>
                    </select>
                  </div>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      id='searchAdvTime'
                      placeholder='dd-mm-yyyy'
                    />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <label for='minPostCount'>Minimum Post Count</label>
                <select className='form-control' id='minPostCount'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option selected>10</option>
                </select>
              </div>
              <div className='form-group'>
                <a href='#' className='btn btn-secondary btn-block'>
                  Search
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalSearch
