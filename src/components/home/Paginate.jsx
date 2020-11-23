import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Paginate = ({ currentPage, totalPages, setCurrentPage, floated }) => {
  return (
    <Pagination
      floated={floated}
      boundaryRange={0}
      firstItem={null}
      lastItem={null}
      ellipsisItem={null}
      pointing
      secondary
      activePage={currentPage}
      siblingRange={1}
      totalPages={totalPages}
      onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
    />
  )
}
export default Paginate
