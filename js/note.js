// Sources used for this js file:
// Youtube videos
// W3Schools
// Chatgpt for debugging purposes, and research on localStorage

// Note class to manage the notes created/removed for a single note
class Note {
    constructor(id, text = '') {
        this.id = id; // A Unique identifier for the note
        this.text = text || messages.notePrompt; // The text content of the note
    }

    // Method to create note element
    createElement() {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.dataset.id = this.id;
        noteElement.appendChild(this.createTextarea());
        if (window.location.pathname.includes('writer.html')) {
            noteElement.appendChild(this.createRemoveButton());
        }
        return noteElement;
    }

    // Helper method to create a textarea for the note
    createTextarea() {
        const textarea = document.createElement('textarea');
        textarea.placeholder = messages.notePrompt; // Placeholder text
        textarea.value = this.text; // Actual text (empty if a new note)
        textarea.addEventListener('input', () => this.updateText(textarea.value));
        return textarea;
    }

    // Helper method to create a remove button for the note
    createRemoveButton() {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove"; // Set the button text to "Remove"
        removeBtn.addEventListener('click', () => this.remove());
        return removeBtn;
    }

    // Method to update note text and save to local storage
    updateText(newText) {
        this.text = newText;
        Note.saveNotes();
    }

    // Method to remove the note from local storage and the DOM
    remove() {
        // Removes the note element from DOM
        document.querySelector(`[data-id="${this.id}"]`).remove();
        // Removes the note from localStorage
        Note.removeFromLocalStorage(this.id);
        // Show a message or update the UI to reflect removal
        // alert(messages.noteRemoved);  // Commented out, but is an alert that can be popped up
    }

    // Remove a note from localStorage by its id
    static removeFromLocalStorage(id) {
        let notesArray = Note.getNotesArray();
        notesArray = notesArray.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notesArray));
    }

    // Static method to save all notes to local storage
    static saveNotes() {
        const notesData = Array.from(document.querySelectorAll('.note')).map((noteElement, index) => ({
            id: index,
            text: noteElement.querySelector('textarea').value
        }));
        localStorage.setItem('notes', JSON.stringify(notesData));
    }
}
