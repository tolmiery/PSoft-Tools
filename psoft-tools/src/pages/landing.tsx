import "./Landing.css";

export default function Landing() {
    return(
        <>
            <div className="landing">
                <img
                src="logo.png"
                className="landinglogo"
                onClick={() => {
                    window.location.href = "/";
                }}
                />
            </div>
        </>
        //console.log("hi")
    )
}