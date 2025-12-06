import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { tag, search, page=1, perPage =10 } = req.query;
  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * perPage;
  const totalNotes = await Note.countDocuments(filter);
  const totalPages = Math.ceil(totalNotes / perPage);

  const notes = await Note.find(filter)
    .skip(skip)
    .limit(Number(perPage));

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
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
