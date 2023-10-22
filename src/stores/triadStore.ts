import type { Ref } from 'vue';
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Triad, Note } from '@/types';
import { randomNote, randomChordType, randomBassString, randomInversion, GuitarString } from '@/types';
import { noteFretOnString, notesForInversion, notesForTriad } from '@/utils';

export const useTriadStore = defineStore('triad', () => {
  const triad: Ref<null | Triad> = ref(null);
  const third: Ref<null | Note> = ref(null);
  const fifth: Ref<null | Note> = ref(null);
  const notes: Ref<number[]> = ref([]);
  const strings: Ref<GuitarString[]> = ref([]);
  const frets: Ref<number[]> = ref([]);
  const displayNotes: Ref<boolean> = ref(false);
  function newTriad() {
    triad.value =  {
        note: randomNote(),
        chordType: randomChordType(),
        bassString: randomBassString(),
        inversion: randomInversion()
    };
    const triadNotes = notesForTriad(triad.value.note, triad.value.chordType);
    third.value = triadNotes[1];
    fifth.value = triadNotes[2];
    notes.value = notesForInversion(triadNotes, triad.value.inversion);
    const bassStringNum = triad.value.bassString as number;
    strings.value = [triad.value.bassString as number as GuitarString, (bassStringNum + 1) as GuitarString, (bassStringNum + 2) as GuitarString];
    frets.value = [
      noteFretOnString(notes.value[0], strings.value[0]),
      noteFretOnString(notes.value[1], strings.value[1]),
      noteFretOnString(notes.value[2], strings.value[2])
    ];
    const maxFret = Math.max(...frets.value);
    frets.value = frets.value.map((fret: number) =>  maxFret - fret > 6 ? fret + 12 : fret);

    displayNotes.value = false;
  }
  function showNotes() {
    displayNotes.value = true; 
  }

  return { triad, third, fifth, notes, strings, frets, displayNotes, newTriad, showNotes }
}) 
