
export const fetchApplicantDoc = async (applicantID) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/applicant-documents/${applicantID}`)
    return res.json()
}

//applicant contacts

export const fetchApplicantContacts = async (applicantID) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/admin-contacts/${applicantID}`)
    return res.json()
} 
