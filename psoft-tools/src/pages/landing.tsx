import "./landing.css";

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
