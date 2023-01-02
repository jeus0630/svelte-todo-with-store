<script lang="ts">
    import { todoList } from "../store";
    import TodoItem from "./TodoItem.svelte";
</script>

<ul>
    {#each $todoList as todo, i}
        <TodoItem {todo}></TodoItem>
    {/each}
</ul>

<style>
    ul{
        padding: 0px;
    }
</style>