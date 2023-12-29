<script lang="ts">
    import {BaseDirectory, writeTextFile} from '@tauri-apps/api/fs';
    import {codeStore} from '../stores';
    import {Icon} from "$lib";

    async function saveFile() {
        try {
            await writeTextFile(`foo.kts`, $codeStore, {dir: BaseDirectory.Desktop});
        } catch (e) {
            console.error(e)
        }
    }
</script>

<div class="h-full flex flex-col bg-gray-950 bar">
    <button on:click={saveFile}><Icon iconClass="fa-save" className="text-green-400 hover:bg-green-500" /></button>
</div>

<style>
    .bar {
        background-color: hsl(0, 0%, 12%);
        border-right: 1px solid #2d2d2d;
    }
</style>