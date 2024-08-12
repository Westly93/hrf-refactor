export const fetchInterviewsByAdvert = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/interview-candidates/${id}`)
    return res.json()
}   