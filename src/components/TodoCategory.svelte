<script lang="ts">
    import { init } from "../store";

    const buttons = ["All", "Active", "Done"];

    $: categoryHandler = (content) => init.updateCategoryHandler(content);
</script>

<ul>
    {#each buttons as button, i}
        <li>
            <button on:click={() => categoryHandler(button)}>{button}</button>
        </li>
    {/each}
</ul>

<style>
    ul{
        display: flex;
        margin: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 0;
    }

    li{
        list-style: none;
    }

    li + li {
        margin-left: 10px;
    }
</style>