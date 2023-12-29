<script lang="ts">
    import {CodeEditor, OutputPane, SideBar} from "$lib";
</script>

<main class="flex flex-row w-screen h-screen">
    <div class="">
        <SideBar />
    </div>
    <div class="w-full flex flex-row">
        <div class="h-screen w-1/2 border-x-1 border-x-gray-700">
            <CodeEditor />
        </div>
        <div class="h-screen w-1/2">
            <OutputPane />
        </div>
    </div>
</main>
