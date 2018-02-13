$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes).reverse();
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                timestamp: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        displayDate: function(ts) {
          let date = (typeof(ts) === 'number') ? new Date(ts): undefined;
          if (date) { 
            date = '<br/><small class="note-date">' + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + '</small>';
          } else { date = ''}
          return date;
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
              
                htmlStr += '<li class="note">'+
                        note.content + 
                        octopus.displayDate(note.timestamp) +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});