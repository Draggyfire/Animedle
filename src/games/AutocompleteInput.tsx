import React, { useState } from 'react';
import { Form, ListGroup, Image } from 'react-bootstrap';
import './style.css';
import bleachData from '../data/bleachData.json'; // Importation du fichier JSON

// Définir le type pour un personnage Bleach
interface BleachCharacter {
    name: string;
    image: string;
    firstAppearanceArc: string;
    type: string; // Exemple: "Human", "Shinigami", "Hollow", "Quincy", etc.
}

const AutocompleteInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<BleachCharacter[]>([]); // Suggestions de type BleachCharacter[]
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [usedSuggestions, setUsedSuggestions] = useState<BleachCharacter[]>([]); // Utilisation de BleachCharacter[]

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            // Filtrer les suggestions basées sur la recherche et exclure les suggestions déjà utilisées
            /*const filteredSuggestions = bleachData
                .filter(character =>
                    character.name.toLowerCase().includes(value.toLowerCase()) &&
                    !usedSuggestions.some(used => used.name === character.name) // Comparer par le nom pour exclure
                );
                */
            //setSuggestions(filteredSuggestions);
            setSelectedIndex(0); // Réinitialiser l'index sélectionné
        } else {
            setSuggestions([]); // Vider les suggestions si l'input est vide
        }
    };

    const handleSuggestionClick = (suggestion: BleachCharacter) => {
        setInputValue(suggestion.name); // Mettre à jour l'input avec le nom sélectionné
        setSuggestions([]); // Vider les suggestions après la sélection
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            validateSelection(); // Valider la sélection avec la touche "Enter"
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const validateSelection = () => {
        if (suggestions.length > 0) {
            const selectedCharacter = suggestions[selectedIndex];
            console.log(selectedCharacter.name); // Afficher le personnage sélectionné dans la console

            // Ajouter la suggestion validée à la liste des suggestions utilisées
            setUsedSuggestions((prev) => [...prev, selectedCharacter]);

            // Réinitialiser l'input et les suggestions après validation
            setInputValue('');
            setSuggestions([]);
            setSelectedIndex(0);
        }
    };

    return (
        <div>
            <Form.Group>
                <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tapez un personnage de Bleach..."
                />
            </Form.Group>
            {suggestions.length > 0 && (
                <ListGroup className="mt-2">
                    {suggestions.map((suggestion, index) => (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handleSuggestionClick(suggestion)}
                            active={index === selectedIndex} // Mettre en surbrillance la suggestion sélectionnée
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <Image src={suggestion.image} alt={suggestion.name} rounded className="fixed-image" />
                            {suggestion.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default AutocompleteInput;
