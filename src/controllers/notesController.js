import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const perPage = Number(req.query.perPage);
    const { tag, search } = req.query;
    const userId = req.user._id;

    const skip = (page - 1) * perPage;

    const notesQuery = Note.find().where('userId').equals(userId);
    const countQuery = Note.countDocuments().where('userId').equals(userId);

    if (tag) {
      notesQuery.where('tag').equals(tag);
      countQuery.where('tag').equals(tag);
    }

    if (search) {
      const searchQuery = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      };

      notesQuery.where(searchQuery);
      countQuery.where(searchQuery);
    }

    const totalNotes = await countQuery;
    const totalPages = Math.ceil(totalNotes / perPage);

    const notes = await notesQuery.skip(skip).limit(perPage);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await Note.findOne()
      .where('_id')
      .equals(noteId)
      .where('userId')
      .equals(userId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await Note.findOneAndUpdate(
      {
        _id: noteId,
        userId,
      },
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await Note.findOneAndDelete({
      _id: noteId,
      userId,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
