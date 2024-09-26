import './ColoredTables.css';  // Assurez-vous d'avoir créé le fichier CSS
import './Guesser.css';
import AutocompleteInput from "./AutocompleteInput.tsx";

function Guesser(){
    return (
        <>
            <table className="colored-table">
                <tbody>
                <tr>
                    <td className="cell red">Rouge</td>
                    <td className="cell blue">Bleu</td>
                    <td className="cell green">Vert</td>
                    <td className="cell yellow">Jaune</td>
                    <td className="cell purple">Violet</td>
                </tr>
                </tbody>
            </table>
            <AutocompleteInput/>
        </>
    );
}


export default Guesser;