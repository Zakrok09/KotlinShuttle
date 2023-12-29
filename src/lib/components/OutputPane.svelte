<script lang="ts">
    import {outputStore} from '../stores';
</script>



<pre class="w-full h-full p-4 font-mono editor {$outputStore.error ? 'text-red-500' : ''}">
    {$outputStore.output}
</pre>

<style>
    .editor {
        background-color: #111111;
        border: none;
    }
</style>