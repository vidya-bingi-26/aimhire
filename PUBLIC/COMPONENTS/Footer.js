function Footer() {
  return (
    <>
        <div className="footerColumn">
            <h1>AimHire</h1>
            <div className="footerColumnContent">
                <p>Copyright <i class="fa-regular fa-copyright"></i> 2024</p>
                <p>All right reserved</p>
                <div className="socialIconBox">
                <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
        </div>

        <div className="footerColumn">
            <h3>Learn More</h3>
            <div className="footerColumnContent">
                <a href="#">About Us</a>
                <a href="#">Services</a>
                <a href="#">Career</a>
                <a href="#">Terms of Use</a>
                <a href="#">Privacy & Policy</a>
            </div>
        </div>

        <div className="footerColumn">
            <h3>Get In Touch</h3>
            <div className="footerColumnContent footerContactColumn">
                <a href="#"><i class="fa-solid fa-envelope"></i> contact@aimhire.in</a>
                <a href="#"><i class="fa-solid fa-envelope"></i> helpdesk@aimhire.in</a>
                <a href="#"><i class="fa-solid fa-envelope"></i> support@aimhire.in</a>
            </div>
        </div>

        <div className="footerColumn newsLetterColumn">
            <h3>Our NewsLetter</h3>
            <p>Subscribe to our newsletter to get our news & deals delivered to you.</p>
            <div className="footerColumnContent">
                <div className="newsletterEmailBox">
                    <form action="#">
                        <input type="email" name="useremail" id="useremail" placeholder='Email Id'/>
                    </form>
                    <button type="submit" className="join-btn">Join</button>
                </div>
            </div>
        </div>

        
    </>
  )
}

window.Footer = Footer;