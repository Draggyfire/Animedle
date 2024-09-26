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

// Définir les props pour AutocompleteInput
interface AutocompleteInputProps {
    onCharacterSelected: (character: BleachCharacter) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onCharacterSelected }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<BleachCharacter[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [usedSuggestions, setUsedSuggestions] = useState<BleachCharacter[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            const filteredSuggestions = bleachData
                .filter(character =>
                    character.name.toLowerCase().includes(value.toLowerCase()) &&
                    !usedSuggestions.some(used => used.name === character.name)
                );
            setSuggestions(filteredSuggestions);
            setSelectedIndex(0);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: BleachCharacter) => {
        setInputValue(suggestion.name);
        setSuggestions([]);
        validateSelection(suggestion); // Valider la sélection
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (suggestions.length > 0) {
                validateSelection(suggestions[selectedIndex]);
            }
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const validateSelection = (selectedCharacter: BleachCharacter) => {
        console.log(selectedCharacter.name);

        // Ajouter la suggestion validée à la liste des suggestions utilisées
        setUsedSuggestions((prev) => [...prev, selectedCharacter]);

        // Appeler la fonction onCharacterSelected pour ajouter la ligne au tableau
        onCharacterSelected(selectedCharacter);

        // Réinitialiser l'input et les suggestions après validation
        setInputValue('');
        setSuggestions([]);
        setSelectedIndex(0);
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
                            active={index === selectedIndex}
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
