type PropTypes = {
    error?: boolean;
    title?: string ;
    content?: string ;
}

export default function Notification({error, title, content}:PropTypes) {
    switch(error){
        case undefined: return (
            <p>Nothing to show yet</p>
        )
        case false: return (
            <div>
                <p>{title || "Success!"}</p>
                <p>{content || ""}</p>
            </div>
        )
        default: return (
            <div>
                <p>{title || "Error!"}</p>
                <p>{content || ""}</p>
            </div>
        )
    }
}