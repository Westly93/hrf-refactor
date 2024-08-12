import {useState} from "react"

const Requirement= ({requirement})=>{
	const [showModal, setShowModal]= useState(false)
  const handleClick=(requirement)=>{
    setShowModal(true)
    console.log(requirement)
  }
	return (
		<div>
			<tr>
            	<td>{requirement.requirement.description}</td>
                <td>
                    <button className="btn btn-success btn-sm px-3">
                        {requirement.weight}%
                   	</button>
                </td>
                <td><button onClick={()=>handleClick(requirement.id)} id={requirement.id} data-bs-toggle="modal" data-bs-target={`#${requirement.id}`} className="btn btn-primary btn-sm">edit</button></td>
                <td><button className="btn btn-danger btn-sm">delete</button></td>
            </tr>
			<div class="modal fade" id={requirement.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div class="modal-body">
			        ...
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			        <button type="button" class="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
	)
}

export default Requirement