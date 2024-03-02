<template>
    <table class="fretboard">
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>o</td>
            <td></td>
            <td>o</td>
            <td></td>
            <td>o</td>
            <td></td>
            <td>o</td>
            <td></td>
            <td></td>
            <td>oo</td>
        </tr>
        <tr v-for="(string, idx) in strings.slice().reverse()">
            <td>{{ stringLabel(idx) }}</td>
            <td v-for="(fret, sidx) in string" :class="sidx === 0 ? 'fret-0' : 'fret'">{{ fret }}</td>
        </tr>
    </table>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useTriadStore } from '@/stores/triadStore';
import { getAdjustedNoteMappings } from "@/utils";
import { GuitarString } from "@/types";

const store = useTriadStore();
const stringCount = 6;
const fretCount = 16;
const initialiseString  = () => Array(fretCount).fill("");

const strings = computed(() => {
    const result = [initialiseString(), initialiseString(), initialiseString(), initialiseString(), initialiseString(), initialiseString()];
    const adjustedNotesMapping = getAdjustedNoteMappings(store.triad!!, store.third!!, store.fifth!!);
    const bassString = store.triad!!.bassString;
        
    [0, 1,2].forEach((idx) => result[bassString + idx][store.frets[idx]] = adjustedNotesMapping[store.notes[idx]]);
    return result;
});

const stringLabel = (idx: number) => GuitarString[stringCount - (idx + 1)]; // reversed for table  
</script>