export enum Note {
    Ab = 0,
    A = 1,
    Bb = 2,
    B = 3,
    C = 4,
    Db = 5,
    D = 6,
    Eb = 7,
    E = 8,
    F = 9,
    Gb = 10,
    G = 11
}

function randomWhole(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

export const randomNote = () => {
    return randomWhole(Note.G as number) as Note;
}

export enum ChordType {
    Major = 0,
    Minor = 1,
    Diminished = 2,
    Augmented = 3
}

export const randomChordType = () => {
    return randomWhole(ChordType.Augmented as number) as ChordType;
}

export enum BassString {
    E = 0,
    A = 1,
    D = 2,
    G = 3
}

export const randomBassString = () => {
    return randomWhole(BassString.G as number) as BassString;
}

export enum Inversion {
    Root = 0,
    First = 1,
    Second = 2
}

export const randomInversion = () => {
    return randomWhole(Inversion.Second) as Inversion;
}

export interface Triad {
    note: Note,
    chordType: ChordType,
    bassString: BassString,
    inversion: Inversion
}

export const getNoteAsSharp = (note: Note) => {
    switch(note) {
        case Note.Ab:
            return "G#";
        case Note.Bb:
            return "A#";
        case Note.Db:
            return "C#";
        case Note.Eb:
            return "D#";
        case Note.Gb:
            return "F#";
        default:
            return Note[note];           
    }
}