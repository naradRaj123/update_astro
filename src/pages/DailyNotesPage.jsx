import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, Save, PlusCircle, Trash2 } from 'lucide-react';

const DailyNotesPage = () => {
  // Mock state for notes - in a real app, this would come from localStorage or backend
  const [notes, setNotes] = React.useState([
    { id: 1, date: new Date().toISOString().split('T')[0], title: "Today's Reflections", content: "Felt a strong connection to Jupiter today. Good day for learning." },
    { id: 2, date: "2025-05-30", title: "Dream Analysis", content: "Dreamt of flying over mountains. Might signify overcoming obstacles." },
  ]);
  const [currentNote, setCurrentNote] = React.useState({ id: null, title: '', content: '' });
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSelectNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNote = () => {
    if (currentNote.id) { // Update existing note
      setNotes(notes.map(n => n.id === currentNote.id ? { ...currentNote, date: new Date().toISOString().split('T')[0] } : n));
    } else { // Add new note
      setNotes([...notes, { ...currentNote, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
    }
    setIsEditing(false);
    setCurrentNote({ id: null, title: '', content: '' });
  };

  const handleAddNew = () => {
    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(true);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    if (currentNote.id === id) {
      setIsEditing(false);
      setCurrentNote({ id: null, title: '', content: '' });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-yellow-50">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-yellow-400">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <Edit3 className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">My Daily Notes</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Record your thoughts, dreams, and astrological observations.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
            {/* Notes List */}
            <div className="md:col-span-1 space-y-3 max-h-96 overflow-y-auto pr-2">
              <Button onClick={handleAddNew} className="w-full btn-primary-theme text-gray-800 mb-3">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Note
              </Button>
              {notes.sort((a,b) => new Date(b.date) - new Date(a.date)).map(note => (
                <Card 
                  key={note.id} 
                  className={`p-3 cursor-pointer hover:shadow-md transition-shadow border ${currentNote.id === note.id && isEditing ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                  onClick={() => handleSelectNote(note)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-700">{note.title || "Untitled Note"}</h4>
                      <p className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 truncate">{note.content.substring(0,50)}...</p>
                </Card>
              ))}
              {notes.length === 0 && <p className="text-center text-gray-500 py-4">No notes yet. Add one!</p>}
            </div>

            {/* Note Editor */}
            <div className="md:col-span-2">
              {isEditing ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="space-y-4 p-4 border border-yellow-300 rounded-lg bg-yellow-50"
                >
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={currentNote.title}
                      onChange={handleInputChange}
                      placeholder="Note Title" 
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 bg-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">Content</Label>
                    <Textarea 
                      id="content" 
                      name="content"
                      value={currentNote.content}
                      onChange={handleInputChange}
                      placeholder="Write your thoughts here..." 
                      rows={10} 
                      className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 bg-white" 
                    />
                  </div>
                  <Button onClick={handleSaveNote} className="w-full btn-primary-theme text-gray-800">
                    <Save className="mr-2 h-5 w-5" /> {currentNote.id ? 'Update Note' : 'Save Note'}
                  </Button>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 border border-dashed border-yellow-300 rounded-lg bg-yellow-50 text-gray-500">
                  <Edit3 className="h-12 w-12 mb-3" />
                  <p>Select a note to view or edit, or add a new one.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DailyNotesPage;