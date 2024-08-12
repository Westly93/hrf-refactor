export const fetchApplicantContactById = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/applicants/${id}`)
    return res.json()
}   
