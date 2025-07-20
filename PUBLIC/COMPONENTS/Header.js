
function Header(){
    return(
        <>
          <a className="logo" href="/jobSeeker/"><img src="/PUBLIC/ASSETS/IMAGES/favicon.png" alt="" />Aim<span>Hire</span></a>
          <nav>
            <ul>
              <li><a href="/jobSeeker/" className='navLinks'>Home</a></li>
              <li><a href="/jobSeeker/jobList" className='navLinks'>Find Jobs</a></li>
              <li><a href="/jobSeeker/applicant-dashboard" className='navLinks'>Dashboard</a></li>
            </ul>
          </nav>
        </>
    )
}

window.Header = Header;