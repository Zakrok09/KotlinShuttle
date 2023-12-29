<script lang="ts">
    import {Icon} from "$lib";
    import {getToastStore, initializeStores, Toast, type ToastSettings} from '@skeletonlabs/skeleton';
    import '../app.postcss';
    import { appWindow } from '@tauri-apps/api/window';
    import { Command } from '@tauri-apps/api/shell'
    import {path} from "@tauri-apps/api";
    import {outputStore} from "$lib/stores";
    initializeStores();
    const toastStore = getToastStore();

    async function compileScript() {
        outputStore.set({output: '', error: false});

        let t: ToastSettings = {
            message: 'Compiling the file...',
            background: 'bg-blue-500',
            hideDismiss: true,
            autohide: false,
            classes: 'text-white'
        };
        let loadingToast = toastStore.trigger(t);


        const desktopPath = await path.desktopDir();
        const command = new Command('kotlin-compile', ['-script', `${desktopPath}/foo.kts`]);

        command.on("close", () => {
            console.log("Child closed")
            toastStore.close(loadingToast);

            let tSuccess: ToastSettings = {
                message: 'File ran successfully!',
                hideDismiss: true,
                timeout: 2000,
                background: 'bg-green-500',
                classes: 'text-white'
            };

            let tFailure: ToastSettings = {
                message: 'Error when compiling!',
                hideDismiss: true,
                timeout: 2000,
                background: 'bg-red-500',
                classes: 'text-white'
            };

            if ($outputStore.error) {
                toastStore.trigger(tFailure);
            } else {
                toastStore.trigger(tSuccess);
            }
        })
        command.on("error", (error) => {

            let tFailure: ToastSettings = {
                message: `Error when executing! ${error}`,
                hideDismiss: true,
                timeout: 2000,
                background: 'bg-red-500',
                classes: 'text-white'
            };
            toastStore.trigger(tFailure);
        })
        command.stdout.on("data", (line) => {
            let oldOutput = $outputStore.output;
            outputStore.set({output: oldOutput + line, error: false});
        })
        command.stderr.on("data", (line) => {
            let oldOutput = $outputStore.output;
            outputStore.set({output: oldOutput + line, error: false});
        })


        await command.spawn();

    }
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