<script lang="ts">
    import {outputStore} from '../stores';
</script>



<textarea bind:value={$outputStore.output}
          class="w-full h-full p-4 font-mono editor {$outputStore.error ? 'text-red-500' : ''}" readonly />

<style>
    .editor {
        background-color: #111111;
        border: none;
    }
</style>