import type { Ref } from 'vue';
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Triad } from '@/types';
import { randomNote, randomChordType, randomBassString, randomInversion } from '@/types';

export const useTriadStore = defineStore('triad', () => {
  const triad: Ref<null | Triad> = ref(null)
  function newTriad() {
    triad.value =  {
        note: randomNote(),
        chordType: randomChordType(),
        bassString: randomBassString(),
        inversion: randomInversion()
    };
  }

  return { triad, newTriad }
})
