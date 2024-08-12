import React from 'react'

const PrintableTable = ({profiles, calculateAge, advert}) => {
  return (
    <div>
      <h4 className='mt-5 mb-5'>Summary Table for <b>{advert?.title}</b>  Advert</h4>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Full Name</th>
      <th scope="col">Gender</th>
      <th scope='col'>Age(years)</th>
      <th scope="col">Experience</th>
      <th scope="col">Qualifications</th>
      <th scope="col">Remarks</th>
    </tr>
  </thead>
  
  <tbody>
    {profiles.map((d, index)=>(
        <tr key={index}>
      <td><strong>{d.firstnames} {d.surname}</strong></td>
      <td><strong>{d.sex}</strong></td>
      <td><strong>{calculateAge(d.dob)}</strong></td>
      <td>
        {JSON.parse(d.experience).map(exp=>(
          <>
          {exp.title ?
          <div>
            <ul>
              <li><strong>{exp.title}</strong></li>
              <h7>{exp.company}</h7>
              <h7>{exp.location}</h7><br />
              <h7>{exp.start_date} - {exp.end_date ? (<span>{exp.end_date}</span>) : (<span>Present</span>)}</h7>
            </ul>
          </div> 
           : <h7>N/A</h7>}
          </>
            
        ))}
      </td>
      <td>
        {JSON.parse(d.qualifications).map(q=>(
          <>
          { q.grade ? 
          <div>
            <ul>
              <li><strong>{q.institution}</strong></li>
              <p>{q.qualification}</p>
              
              <h6>Grade: {q.grade}</h6>
            </ul>
              
          </div>
          : <p>N/A</p>}
          </>
            
        ))}
      </td>
      <td>
      <textarea className="form-control" id="exampleFormControlTextarea1" rows="7" cols={30}></textarea>
      </td>
    </tr>
    ))}
    
  </tbody>
</table>
    </div>
  )
}

export default PrintableTable
