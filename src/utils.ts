import { Note, ChordType, Inversion, BassString, GuitarString, getNoteAsSharp, maxNoteIndex, stringAsNote } from "./types";


export const chordTypeIntervals = {
    [ChordType.Major]: [4, 3],
    [ChordType.Minor]: [3, 4],
    [ChordType.Augmented]: [4, 4],
    [ChordType.Diminished]: [3, 3]
};

export const notesForTriad = (note: Note, chordType: ChordType) => {
    const intervals = chordTypeIntervals[chordType];
    const third  = (note as number) + intervals[0];
    const fifth = third + intervals[1];
    const thirdNote = (third % (maxNoteIndex + 1)) as Note;
    const fifthNote = (fifth % (maxNoteIndex + 1)) as Note;
    return [note, thirdNote, fifthNote];
};

export const notesForInversion = (notes: Note[], inversion: Inversion) => {
    switch (inversion) {
        case Inversion.Root: return [...notes];
        case Inversion.First: return [notes[1], notes[2], notes[0]];
        case Inversion.Second: return [notes[2], notes[0], notes[1]];
    }
};

export const getDisplayNote = (enumNote: number, chordType: ChordType) => {
    if (chordType === ChordType.Minor) {
        return getNoteAsSharp(enumNote);
    } else {
        return Note[enumNote];
    }
};

export const noteFretOnString = (note: Note, string: GuitarString) => {
    const stringNote = stringAsNote(string);
    let interval = (note as number) - (stringNote as number);
    if (interval < 0) {
        interval += (maxNoteIndex + 1);
    }
    return interval;
};


