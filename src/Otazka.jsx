const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

/* eslint-disable react/prop-types */
function Question(props) {
    return (
        <>
            <tr><th colSpan={2}><h2>{props.questionText}</h2></th></tr>
            {props.subQuestions.map((question, index) => (
                <tr key={letters[index] + props.id}>
                    <td>{question}</td>
                    <td><input id={letters[index] + props.id} type="number" min={0}/></td>
                </tr>
            ))}
            <tr><th colSpan={2}><hr/></th></tr>
        </>
    )
}

export default Question;