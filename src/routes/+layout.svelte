<script lang="ts">
    import {Icon} from "$lib";
    import {initializeStores, Toast} from '@skeletonlabs/skeleton';
    import '../app.postcss';
    import { appWindow } from '@tauri-apps/api/window';
    import { Command } from '@tauri-apps/api/shell'
    import {path} from "@tauri-apps/api";
    import {outputStore} from "$lib/stores";

    async function compileScript() {
        const desktopPath = await path.desktopDir();
        const output = await new Command('kotlin-compile', ['-script', `${desktopPath}/foo.kts`]).execute();

        if (output.stderr === '') {
            outputStore.set({output: output.stdout, error: false});
        } else {
            outputStore.set({output: output.stderr, error: true});
        }
    }

    initializeStores();
</script>

<Toast />
<div class="overflow-x-hidden overflow-y-hidden h-screen">
    <div data-tauri-drag-region class="w-screen flex flex-row p-1 items-center bg-[#1e1e1e] border-b-2 border-b-[#2d2d2d]">
        <div class="flex flex-row ml-auto gap-4">
            <div class="flex flex-row">
                <button on:click={compileScript}><Icon iconClass="fa-play" className="text-green-400 hover:bg-green-500" /></button>
                <button><Icon iconClass="fa-stop" className="text-red-400 hover:bg-red-500" /></button>
            </div>
            <div class="flex flex-row">
                <button on:click={appWindow.minimize}><Icon iconClass="fa-window-minimize" className="text-gray-400 hover:bg-gray-500" /></button>
                <button on:click={appWindow.maximize}><Icon iconClass="fa-window-maximize" className="text-gray-400 hover:bg-gray-500" /></button>
                <button on:click={appWindow.close}><Icon iconClass="fa-times" className="text-gray-400 hover:bg-gray-500" /></button>
            </div>
        </div>
    </div>
    <slot />
</div>