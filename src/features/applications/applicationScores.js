export const fetchApplicationRequirementScores = async () => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/application-scores`)
    return res.json()
}   
