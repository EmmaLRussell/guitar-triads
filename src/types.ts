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

export const maxNoteIndex = Note.G as number;

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

export enum GuitarString {
    E = 0,
    A = 1,
    D = 2,
    G = 3,
    B = 4,
    EHigh = 5
}

export enum BassString {
    E = GuitarString.E,
    A = GuitarString.A,
    D = GuitarString.D,
    G = GuitarString.G
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

export const noteLetters = ["A", "B", "C", "D", "E", "F", "G"];

export const noteAliases = {
    [Note.Ab]: ["G#"],
    [Note.A]: ["G##", "Bbb"],
    [Note.Bb]: ["A#"],
    [Note.B]: ["A##", "Cb"],
    [Note.C]: ["B#", "Dbb"],
    [Note.Db]: ["C#"],
    [Note.D]: ["C##", "Ebb"],
    [Note.Eb]: ["D#"],
    [Note.E]: ["D##", "Fb"],
    [Note.F]: ["E#", "Gbb"],
    [Note.Gb]: ["F#"],
    [Note.G]: ["F##", "Abb"]
};

export const adjustTriadForRoot = (root: string, third: Note, fifth: Note) => {
    const rootLetter = Array.from(root)[0];
    const rootIdx = noteLetters.indexOf(rootLetter);
    const thirdNoteLetter = noteLetters[(rootIdx + 2) % (noteLetters.length)];
    const fifthNoteLetter = noteLetters[(rootIdx + 4) % (noteLetters.length)];
    let thirdString: string | undefined = Note[third];
    let fifthString: string | undefined = Note[fifth];
    if (thirdNoteLetter !== Array.from(thirdString)[0]) {
        thirdString = noteAliases[third]!!.find((s) => Array.from(s)[0] == thirdNoteLetter)!!;
    }
    if (fifthNoteLetter !== Array.from(fifthString)[0]) {
        fifthString = noteAliases[fifth]!!.find((s) => Array.from(s)[0] == fifthNoteLetter)!!;
    }
    return [root, thirdString, fifthString];
};

export const stringAsNote = (string: GuitarString): Note => {
    switch (string) {
        case GuitarString.E:
            return Note.E;
        case GuitarString.A:
            return Note.A;
        case GuitarString.D:
            return Note.D;
        case GuitarString.G:
            return Note.G;
        case GuitarString.B:
            return Note.B;
        case GuitarString.EHigh:
            return Note.E;
    };    
};