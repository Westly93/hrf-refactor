import { Link } from 'react-router-dom'

const RejectedApplicants = () => {
    return(
        <>
            <div className="container">
                <div className="row py-2 justify-content-center">
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center"></div>
                        <div className="card-body text-center">
                            <h2 className="card-title">Name</h2>
                            <p className="card-text">Score</p>
                            <p className="card-text">Status</p>
                            <p></p>
                        </div>
                        <div className="card-footer justify-content-center text-center">
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RejectedApplicants;