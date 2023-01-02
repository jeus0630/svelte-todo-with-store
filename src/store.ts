import {derived, writable} from "svelte/store";

declare global{
    type Category = 'All' | 'Active' | 'Done'
    interface Todo{
        id: string;
        content: string;
        isDone: boolean;
        isEdit: boolean;
    }
}

interface InitValue{
    todoList: Todo[];
    category: Category
}

function setInit(){
    const initValue: InitValue = {
        todoList: [],
        category: 'All'
    }

    const {subscribe, set, update} = writable<InitValue>(initValue);
    
    const addTodoListHandler = (todo) => {
        update(initValue => {
            const todoList = [...initValue.todoList,todo];
            return {
                ...initValue,
                todoList
            }
        })
    }

    const updateTodoListDoneHandler = (id) => {
        update(initValue => {
            const todoList = initValue.todoList.map(todo => {
                if(todo.id === id){
                    todo.isDone = !todo.isDone;
                }

                return todo;
            })

            return{
                ...initValue,
                todoList
            }
            
        })
    }

    const updateTodoListRemoveHandler = (id) => {
        update(initValue => {
            const todoList = 
                initValue.todoList.filter(todo => todo.id !== id);

            return{
                ...initValue,
                todoList
            }
        })
    }

    const updateCategoryHandler = (category) => {
        update(initValue => {
            return {
                ...initValue,
                category
            }
        })
    }

    const updateEditHandler = (id) => {
        update(initValue => {
            const todoList = initValue.todoList.map(el => {
                if(el.id === id){
                    el.isEdit = true;
                }
                return el;
            })
            return {
                ...initValue,
                todoList
            }
        })
    }

    const updateTodoHandler = (id,content) => {
        update(initValue => {
            const todoList = initValue.todoList.map(el => {
                if(el.id === id){
                    el.content = content;
                    el.isEdit = false;
                }
                return el;
            })
            return {
                ...initValue,
                todoList
            }
        })
    }

    return {
        subscribe,
        set,
        update,
        addTodoListHandler,
        updateTodoListDoneHandler,
        updateTodoListRemoveHandler,
        updateCategoryHandler,
        updateEditHandler,
        updateTodoHandler
    }
}

function setTodoList(){
    
    const todoList = derived(init, $init => {
        if($init.category === "All"){
            return $init.todoList;
        }

        if($init.category === "Active"){
            return $init.todoList.filter(todo => !todo.isDone);
        }

        if($init.category === "Done"){
            return $init.todoList.filter(todo => todo.isDone);
        }
    })

    return todoList;
}

export const init = setInit();
export const todoList = setTodoList();
