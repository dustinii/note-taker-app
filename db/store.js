const util = require('util');
const fs = require('fs');

// Unique ID generator
const uuidv1 = require('uuid/v1');

// Promisify read and write functions
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    // read and write functions
    read() {
        return readFile('db/db.json', 'utf8');
    }
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }

    // returns all notes as an array
    getNotes() {
        return this.read().then((notes) => {
            let notes;

            try {
                notes = [].concat(JSON.parse(notes));
            } catch (err) {
                notes = [];
            }

            return notes;
        });
    }

    // adds a new note, returns the new note
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {throw new Error("Please fill out all fields");
        }

        const neoNote = { title, text, id: uuidv1() };

        return this.getNotes()
            // add the new note to the array of notes
            .then((notes) => [...notes, neoNote])
            // write the new note array to the db
            .then((newNotes) => this.write(newNotes))
            // return the new note
            .then(() => neoNote);
    }

    removeNote(id) {
        // Get all notes, remove the note with the given id, write the filtered notes
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filtered) => this.write(filtered));
    }
}

module.exports = new Store();