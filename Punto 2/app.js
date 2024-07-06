

class Note {
    constructor(id, title, body, priority = 'low') {
        this.id = id;
        this.title = title;
        this.body = body;
        this.priority = priority;
    }

    togglePriority() {
        if (this.priority === 'low') {
            this.priority = 'high';
        } else {
            this.priority = 'low';
        }
    }

}

class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || []; // ahora tengo que definir que hace esta linea (colocare el json parceado con las notas)
        this.loadNotes();
    }

    addNote(title, body) {
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
        const note = new Note(id, title, body);
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    toggleNotePriority(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.togglePriority();
            this.saveNotes();
            this.renderNotes();
        }
    }

    editNote(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            const newTitle = prompt('Editar tiúlo; ', note.title);
            const newBody = prompt('Editar cuerpo; ', note.body);
            if (newTitle !== null && newTitle.trim() !== '' && newBody !== null && newBody.trim() !== '') {
                note.title = newTitle.trim();
                note.body = newBody.trim();
                this.saveNotes();
                this.renderNotes();
            }
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        this.renderNotes();
    }

    renderNotes() {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';
        this.notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <button class="toggle-priority" data-id="${note.id}">Prioridad: ${note.priority}</button>
                <button class="delete-note" data-id="${note.id}">Eliminar</button>
                <button class="edit-note" data-id="${note.id}">Editar</button>
            `;
            li.querySelector('.toggle-priority').addEventListener('click', () => this.toggleNotePriority(note.id));
            li.querySelector('.delete-note').addEventListener('click', () => this.deleteNote(note.id));
            li.querySelector('.edit-note').addEventListener('click', () => this.editNote(note.id));

            noteList.appendChild(li);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();

    const addNote = () => {
        const title = document.getElementById('title-new-note').value;
        const body = document.getElementById('body-new-note').value;
        if (title && body) {
            noteManager.addNote(title, body);
            document.getElementById('title-new-note').value = '';
            document.getElementById('body-new-note').value = '';
        }
    };

    document.getElementById('add-new-note').addEventListener('click', addNote);

    document.getElementById('title-new-note', 'body-new-note').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addNote();
        }
    });
});