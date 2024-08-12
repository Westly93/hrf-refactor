import VacancyList from "../features/VacancyList";

import { useAdvertsQuery } from "../redux/features/advertApiSlice";

const Jobs = () => {
  const {data, isLoading, isFetching, error}= useAdvertsQuery();
  //console.log(data?.data)
  if (isLoading | isFetching) {
    return (
      <div>Loading ...</div>
    )
  }
  if(error){
    return (
      <div> Oops something went wrong please visit our help desk services</div>
    )
  }
  return (
    <div>
      {data?.data &&
        data?.data.map((advert) => (
          <VacancyList advert={advert} key={advert.id} />
        ))}
    </div>
  )
}
export default Jobs
