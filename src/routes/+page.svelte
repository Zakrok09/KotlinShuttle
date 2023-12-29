<script lang="ts">
    import {CodeEditor, OutputPane, SideBar} from "$lib";
</script>

<main class="flex flex-col w-screen h-screen">
    <div class="flex flex-row h-full">
        <SideBar />
        <div class="w-full flex flex-row">
            <div class="h-full w-1/2 border-x-1 border-x-gray-700">
                <CodeEditor />
            </div>
            <div class="h-full w-1/2">
                <OutputPane />
            </div>
        </div>
    </div>
</main>
