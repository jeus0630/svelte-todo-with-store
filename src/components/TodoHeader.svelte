<script lang="ts">
    import { init } from "../store";
    import {v4} from "uuid";
    let content = '';
    $: addTodoListHandler = () => {
        const todo = {
            id: v4(),
            content,
            isDone: false,
            isEdit: false
        }
        init.addTodoListHandler(todo);
        content = '';
    }
</script>

<form action="" on:submit|preventDefault={addTodoListHandler}>
    <input type="text" placeholder="오늘의 할일을 입력하세요" bind:value={content}>
</form>
