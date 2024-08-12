import React from 'react'

function ShortlistedTable({ shortlisted }) {
  return (
    <div>
        <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>National ID</th>
                  <th>Contact</th>
                  <th>Advert</th>
                  <th>Total Scores</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(shortlisted) ? (
                  shortlisted.map((person, index) => (
                    <tr key={index}>
                      <td>{person.firstnames}</td>
                      <td>{person.surname}</td>
                      <td>{person.sex}</td>
                      <td>{person.national_id}</td>
                      <td>{person.Cell}</td>
                      <td>{person.title}</td>
                      <td>{person.totalscore}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
    </div>
  )
}

export default ShortlistedTable