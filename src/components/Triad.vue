<template>
    <div class="blurb">
        <p>
        Is your guitar practice boring? <s>Make it even more boring</s> Spice it up with this 
        triad practice generator!
        </p>
        <p>
            Do <span class="strong">you</span> know your triads? Prove it, rock star!
        </p>    
    </div>
    <div>
        <button @click="store.newTriad()" class="">Generate a new triad!</button>
        <div class="triad-details strong" v-if="store.triad">
            <div>
                Chord: {{ displayNote }} {{ displayChordType }} 
            </div>   
            <div>
                Inversion: {{ displayInversion }}
            </div>
            <div>
                Bass string: {{ displayBassString }}
            </div> 
            <button @click="store.showNotes()" class="btn-answer">Show me how to play this thing!</button>
            <template v-if="store.notes.length && store.displayNotes">
                <div class="triad-details">
                    {{ triadNotes }}
                </div>
                <TriadDiagram></TriadDiagram>   
            </template> 
        </div>
    </div>    
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTriadStore } from '@/stores/triadStore';
import { ChordType, Inversion, BassString, GuitarString, getNoteAsSharp, adjustTriadForRoot } from "../types";
import { getDisplayNote } from "../utils";
import TriadDiagram from "./TriadDiagram.vue";
import { storeToRefs } from "pinia";
    const store = useTriadStore();
    
    const displayChordType = computed(() => ChordType[store.triad!!.chordType]);
    const displayNote = computed(() => {
        return getDisplayNote(store.triad!!.note, store.triad!!.chordType);
    });
    const displayInversion = computed(() => Inversion[store.triad!!.inversion]);
    const displayBassString = computed(() => BassString[store.triad!!.bassString]);
    const triadNotes = computed(() => {
        const root = getDisplayNote(store.triad!!.note, store.triad!!.chordType);
        const adjustedNotes = adjustTriadForRoot(root, store.third!!, store.fifth!!);
        const adjustedNotesMapping = {
            [store.triad!!.note]: adjustedNotes[0],
            [store.third!!]: adjustedNotes[1],
            [store.fifth!!]: adjustedNotes[2]
        };
        return store.notes!!.map((note, idx) => `${adjustedNotesMapping[note]} (fret ${store.frets[idx]} on ${GuitarString[store.strings[idx]]})`).join(", ");
    });
</script>