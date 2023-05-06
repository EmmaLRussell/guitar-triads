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
        <button @click="store.newTriad()">Generate a new triad!</button>
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
        </div>
    </div>    
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTriadStore } from '@/stores/triadStore';
import { Note, ChordType, Inversion, BassString, getNoteAsSharp } from "../types";
    const store = useTriadStore();
    
    const displayChordType = computed(() => ChordType[store.triad!!.chordType]);
    const displayNote = computed(() => {
        const enumNote = store.triad!!.note;
        if (store.triad!!.chordType === ChordType.Minor) {
            return getNoteAsSharp(enumNote);
        } else {
            return Note[enumNote];
        }
    });
    const displayInversion = computed(() => Inversion[store.triad!!.inversion]);
    const displayBassString = computed(() => BassString[store.triad!!.bassString]);
</script>