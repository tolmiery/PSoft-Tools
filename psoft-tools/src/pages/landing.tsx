import "./landing.css";

//Displays the greeting page with the PSoft Tools logo upon opening the application
export default function Landing() {
    return(
        <>
            <div className="landing">
                <img
                src="Logo.png"
                className="landinglogo"
                style={{display: "inline"}}
                onClick={() => {
                    window.location.href = "/index";
                }}
                />
            </div>
        </>
    )
}
