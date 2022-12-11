export function stringToMultiLineHTML(string) {
    const stringArray = string.split("\n");
    return (
        <div>
            {stringArray.map((x, index) => <p key={index.toString()}>{x}</p>)}
        </div>
    )
}