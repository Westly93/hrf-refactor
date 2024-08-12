const PageButton = ({ pg, setPage, isPreviousData }) => {
    return <button btn-outline-secondary onClick={() => setPage(pg)}>{pg}</button>
}

export default PageButton