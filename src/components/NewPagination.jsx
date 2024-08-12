const NewPagination=({
    changePageNo,
    data,
    dataPerPage,
    currentPage
  }) =>{
    //console.log(currentPage)
    let numbers = [];
    for (let i = 1; i <= Math.ceil(data/dataPerPage) ;i++){
      numbers.push(i);
    }
    return <div>
      {numbers && numbers.map((no) =>{
        return (
        <button className={`btn ${currentPage == no ? 'btn-primary' : 'btn-outline-primary'} btn-sm`} key={no}
        onClick={() =>{
          changePageNo(no);
        }}
        >{no}</button>)
      })}
    </div>;
  }

  export default NewPagination