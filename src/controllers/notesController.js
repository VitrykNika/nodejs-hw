import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { tag, search, page=1, perPage =10 } = req.query;

  const pageNumber = Number(page) || 1;
  const perPageNumber = Number(perPage) || 10;

  let query = Note.find();

  if (tag) {
    query = query.where('tag').equals(tag);
  }

  if (search) {
    query = query.where({ $text: { $search: search } });
  }

  const skip = (pageNumber - 1) * perPageNumber;

  const notesQuery = query.skip(skip).limit(perPageNumber);
  const countQuery = Note.countDocuments(query.getFilter());

  const [notes, totalNotes] = await Promise.all([notesQuery, countQuery]);

  const totalPages = Math.ceil(totalNotes / perPageNumber) || 0;

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
   });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};


export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};


export const updateNote = async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    {new: true}
  );

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(updatedNote);
};


export const deleteNote = async (req, res) => {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteId);

    if (!deletedNote) {
      throw createHttpError( 404, 'Note not found' );
    }
    res.status(200).json(deletedNote);
};
