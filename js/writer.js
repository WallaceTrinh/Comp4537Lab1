class Writer {
    constructor() {
        this.notesContainer = document.getElementById('notes-container');
        document.getElementById('add-note-btn').addEventListener('click', () => this.addNote());
        this.loadNotes(); // Load notes on page initialization
        setInterval(() => this.updateLastSavedTime(), 2000);
    }

    // Load existing notes from localStorage and display them
    loadNotes() {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        // console.log("Loaded notes:", storedNotes); // Debugging line
        this.notesContainer.innerHTML = ''; // Clear existing notes before loading
        storedNotes.forEach((note, index) => {
            this.notesContainer.appendChild(new Note(index, note.text).createElement());
        });
    }

    // Add a new note and saves it to the localStorage
    addNote() {
        const newNote = new Note(this.notesContainer.children.length);
        this.notesContainer.appendChild(newNote.createElement());
        Note.saveNotes();
    }

    // Updates the last saved time display
    updateLastSavedTime() {
        const lastSavedTimeElement = document.getElementById('last-saved-time');
        lastSavedTimeElement.textContent = `${messages.lastSaved} ${new Date().toLocaleTimeString()}`;
    }
}

// Event listener to help initialize the Writer class when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Writer();
});
