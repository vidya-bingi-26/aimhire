function AdminSideNavBar() {
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
                        <a href="/admin/"><li className="nav-menu-items"><span className="material-symbols-outlined">person_apron</span>Recruiter</li></a>
                        <a href="/admin/applicant_page"><li className="nav-menu-items"><span className="material-symbols-outlined">group</span>Applicant</li></a>
                    </ul>
                </div>
            </div>

            {/* lower part */}
            <div className="recruiter-nav-part2 recruiter-nav-part">
                <div className="nav-menu-box">
                    <h4 className="nav-menu-title">Settings</h4>
                    <ul className="nav-menu-list">
                        <a href=""><li className="nav-menu-items"><span className="material-symbols-outlined">settings</span>Settings</li></a>
                        <a href="/admin/logout" id="logout-link"><span className="material-symbols-outlined">logout</span>Logout</a>
                    </ul>
                </div>
            </div>
        </>
    );
}

window.AdminSideNavBar = AdminSideNavBar;