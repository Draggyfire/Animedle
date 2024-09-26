import React, { useState } from 'react';
import './ColoredTables.css';  // Assurez-vous d'avoir créé le fichier CSS
import './Guesser.css';
import AutocompleteInput from './AutocompleteInput.tsx';

function Guesser() {
    const [rows, setRows] = useState([
        { nom: 'Nom', theme: 'Themes', studio: 'Studio', genre: 'Genre', annee: 'Année' }
    ]);
    const [animatingRow, setAnimatingRow] = useState<number | null>(null); // Gestion de la ligne à animer
    const [animatingCells, setAnimatingCells] = useState<number[]>([]); // Gestion des cellules en animation

    // Fonction pour ajouter une nouvelle ligne au tableau
    const addRow = (character: { name: string, firstAppearanceArc: string, type: string }) => {
        const newRow = {
            nom: character.name,
            theme: character.firstAppearanceArc,
            studio: 'Studio inconnu', // Peut être mis à jour selon les données disponibles
            genre: character.type,
            annee: 'Inconnue' // Peut être mis à jour aussi
        };

        const newIndex = rows.length;
        setRows([...rows, newRow]); // Ajoute la nouvelle ligne au tableau
        setAnimatingRow(newIndex); // Marque la nouvelle ligne pour animation

        // Animer chaque cellule avec un délai progressif
        const cellAnimations: number[] = [];
        for (let i = 0; i < 5; i++) {  // 5 cellules dans une ligne
            setTimeout(() => {
                cellAnimations.push(i);
                setAnimatingCells([...cellAnimations]);
            }, i * 200);  // Délai de 200ms entre chaque cellule
        }

        // Réinitialiser après l'animation
        setTimeout(() => {
            setAnimatingCells([]); // Efface l'animation des cellules
            setAnimatingRow(null);  // Efface l'animation de la ligne
        }, 1200); // Durée totale de l'animation (5 cellules * 200ms)
    };

    return (
        <>
            <table className="colored-table">
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {['nom', 'theme', 'studio', 'genre', 'annee'].map((key, cellIndex) => (
                            <td
                                key={cellIndex}
                                className={`cell ${
                                    index === animatingRow && animatingCells.includes(cellIndex)
                                        ? 'cell-enter cell-enter-active'
                                        : ''
                                } ${key === 'nom' ? 'red' : key === 'theme' ? 'blue' : key === 'studio' ? 'green' : key === 'genre' ? 'yellow' : 'purple'}`}
                            >
                                {row[key as keyof typeof row]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <AutocompleteInput onCharacterSelected={addRow} />
        </>
    );
}

export default Guesser;
