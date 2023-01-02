<script lang="ts">
    import { init } from "../store";
    export let todo:Todo;

    $: ({id, content, isDone, isEdit} = todo);
    $: isDoneHandler = (id) => init.updateTodoListDoneHandler(id);
    $: removeHandler = (id) => init.updateTodoListRemoveHandler(id);
    $: editHandler = (id) => init.updateEditHandler(id);
    $: updateHandler = (id,content) => init.updateTodoHandler(id,content);
    $: value = content;
</script>

<li>
    <input type="checkbox" name="" id="" bind:checked={isDone} on:change={() => isDoneHandler(id)}>
        {#if isEdit}
            <form action="" on:submit|preventDefault={() => updateHandler(id,value)}>
                <input type="text" bind:value={value} on:focusout={() => updateHandler(id,value)} on:change={() => updateHandler(id,value)}>
            </form>
        {:else}
            <span on:dblclick={() => editHandler(id)}>{content}</span>
        {/if}
    <button on:click={() => removeHandler(id)}>X</button>
</li>

<style>
    form{
        display: inline-block;
    }
    li{
        list-style: none;
    }
</style>