export const fetchFilteredAdverts = async (searchQuery) => {
    const result = await fetch(`https://hrm.msu.ac.zw/api/v1/advert?search=${encodeURIComponent(searchQuery)}`)
    return result.json()
  };

export const fetchAdverts = async (currentPage) => {
    const result = await fetch(`https://hrm.msu.ac.zw/api/v1/advert?page=${currentPage}`)
    return result.json()
}

export const singleAdvert = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/advert/${id}`)
    return res.json()
}

export const advertShortList = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/shortlists/${id}`)
    return res.json()
}

export const preadvertShortList = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/testinterview/${id}`)
    return res.json()
}

export const allShortListed = async () => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/shortlists`)
    return res.json()
}

export const updateadvertShortList = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/shortlists/${id}`)
    return res.json()
}

export const destroyadvertShortList = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/shortlists/${id}`)
    return res.json()
}

export const fetchApplications = async (pageParam = 1) => {
    const result = await fetch(`https://hrm.msu.ac.zw/api/v1/application`)
    return result.json()
}

export const fetchInterviewResults = async (currentPage) => {
    const result = await fetch(`https://hrm.msu.ac.zw/api/v1/interview-scores?page=${currentPage}`)
    return result.json()
}

export const fetchQualifications = async () => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/qualifications`)
    return res.json()
}

export const fetchExperience = async () => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/experience`)
    return res.json()
}

export const fetchApplicantId = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/applicants/${id}`)
    return res.json()
}
