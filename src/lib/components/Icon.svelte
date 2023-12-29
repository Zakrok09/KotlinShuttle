<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.css';
    export let iconClass = '';
    export let className = '';
</script>

<button class={`w-8 h-8 rounded p-1 inline-block ${className}`}>
    <i class={`fas ${iconClass}`}></i>
</button>