<script lang="ts">
    import { codeStore } from '../stores';

    function handleInput(event: Event) {
        let target = event.target as HTMLInputElement;
        codeStore.set(target.value);
    }
</script>

<textarea on:input={handleInput}
          class="w-full h-full p-4 outline-none ring-0 font-mono editor" />

<style>
    .editor {
        background-color: #1e1e1e;
        border-right: 1px solid #2d2d2d;
    }
</style>