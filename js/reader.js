// Sources used for this js file:
// Youtube videos
// W3Schools
// Chatgpt for debugging purposes, and research on localStorage

// Reader class responsible for reading and displaying the notes
class Reader {
    constructor() {
        this.notesContainer = document.getElementById("notes-container");
        this.updateNotesDisplay(); // Call it once initially
        setInterval(() => this.updateNotesDisplay(), 2000); // Then every 2 seconds
    }

    // Update the display of notes
    updateNotesDisplay() {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        this.notesContainer.innerHTML = "";
        storedNotes.forEach((note, index) => {
            const noteElement = new Note(index, note.text).createElement();
            noteElement.querySelector('textarea').readOnly = true;
            this.notesContainer.appendChild(noteElement);
        });
        this.updateLastRetrievedTime();
    }

    // Update the display of the last retrieved time
    updateLastRetrievedTime() {
        const lastRetrievedTimeElement = document.getElementById("last-retrieved-time");
        lastRetrievedTimeElement.innerText = `${messages.lastRetrieved} ${new Date().toLocaleTimeString()}`;
    }
}

// Initialize the Reader class when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Reader();
});
