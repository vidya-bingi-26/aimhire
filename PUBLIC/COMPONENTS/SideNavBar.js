function SideNavBar() {
    return(
        <>
            {/* upper part */}
            <div className="recruiter-nav-part1 recruiter-nav-part">
                <div className="nav-logo-box">
                    <a href="/HTML/index.html">
                        <img src="/PUBLIC/assets/images/favicon.png" alt="logo"/>
                        <h2>AimHire</h2>
                    </a>
                </div>
                <div className="nav-menu-box">
                    <h4 className="nav-menu-title">Menu</h4>
                    <ul className="nav-menu-list">
                        <a href="/jobCreator/"><li className="nav-menu-items"><span className="material-symbols-outlined">space_dashboard</span>Dashboard</li></a>
                        <a href="/jobCreator/jobList"><li className="nav-menu-items"><span className="material-symbols-outlined">work</span>Jobs</li></a>

                        <a href="/jobCreator/jobApplications"><li className="nav-menu-items"><span className="material-symbols-outlined">data_table</span>Applications</li></a>
                        
                        <a href="/jobCreator/savedApplications"><li className="nav-menu-items"><span className="material-symbols-outlined">bookmark</span>Saved</li></a>
                    </ul>
                </div>
            </div>

            {/* lower part */}
            <div className="recruiter-nav-part2 recruiter-nav-part">
                <div className="nav-menu-box">
                    <h4 className="nav-menu-title">Settings</h4>
                    <ul className="nav-menu-list">
                        <a href=""><li className="nav-menu-items"><span className="material-symbols-outlined">settings</span>Settings</li></a>
                        <a href="/jobCreator/logout" id="logout-link"><span className="material-symbols-outlined">logout</span>Logout</a>
                    </ul>
                </div>
            </div>
        </>
    );
}

window.SideNavBar = SideNavBar;