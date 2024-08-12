export const fetchPreshortListScore = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/application-scores/${id}`)
    return res.json()
}




export const ApplicantCandidates = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/testinterview/${id}`)
    return res.json()
}