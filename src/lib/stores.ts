import { writable } from 'svelte/store';
import type {Output} from "$lib/types/Output";

export const codeStore = writable('');
export const outputStore = writable<Output>({output: '', error: false});