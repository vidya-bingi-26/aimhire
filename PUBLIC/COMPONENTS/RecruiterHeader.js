function RecruiterHeader(props){
    return(
        <>
            <h1 className="recruiter-header-title">{props.title}</h1>
                <div className="recruiter-header-content-box">
                    <div className="recruiter-header-icons">
                    <p>Welcome, <span>{props.username}</span></p>
                        <div className="icon-box profile-box">
                            <img src={`/public/assets/images/company_logos/${props.profilePic}`} alt="Profile"/>
                        </div>
                        
                    </div>
                </div>
        </>
    );
}

window.RecruiterHeader = RecruiterHeader;