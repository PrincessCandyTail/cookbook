export default function error(props) {
    return (
        <div className="dialogBackground">
            <div className="dialogError">
                <h2 className="dialogTitle">Oh Oh...</h2>
                <p>{props.message}</p>
                <button className="closeButton" onClick={props.closeDialog}>Schliessen</button>
            </div>
        </div>
    )
}