export const fetchDocuTypes = async () => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/document-types`)
    return res.json()
}   