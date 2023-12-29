<script lang="ts">
    import {BaseDirectory, writeTextFile} from '@tauri-apps/api/fs';
    import {codeStore} from '../stores';
    import {Icon} from "$lib";
    import {getToastStore, type ToastSettings} from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();

    async function saveFile() {
        try {
            await writeTextFile(`foo.kts`, $codeStore, {dir: BaseDirectory.AppData});

            const t: ToastSettings = {
                message: 'Successfully saved file to the desktop/foo.kts!',
                hideDismiss: true,
                timeout: 1500,
                background: 'bg-green-500',
                classes: 'text-white'
            };
            toastStore.trigger(t);
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