const fs = require('fs').promises;
const { Command } = require('commander');
const program = new Command();

// Helper function - load todos
async function loadTodos(path){
    // if file doesn't exists, create and initialise it with empty array
    try {
        await fs.access(path); // Check if the file exists
    } catch (err) {
        const emptyArray = JSON.stringify([]);
        await fs.writeFile(path, emptyArray);  // Write an empty array to the file if it doesn't exist
        console.log('File has been created');
    }

    // read the file and return data
    const data = await fs.readFile(path, 'utf-8');
        
    // Return parsed todos or an empty array if no data
    return data ? JSON.parse(data) : [];
}

//Helper function - save todos
async function saveTodos(todos, path){
    await fs.writeFile(path, JSON.stringify(todos, null, 2), (err) => {
        if(err) throw err;
    })
}

program
    .name('todo-list')
    .description('CLI file based todo list')
    .version('0.5.0');

program.command('add-todo')
    .description('Add todos to json')
    .option('-f, --file <filename>', 'specify file name', 'todos.json')
    .argument('<todo>', 'todo')
    .action(async (todo, options) => {
        const todos = await loadTodos(options.file);
        todos.push({
            todo: todo,
            done: false
        });
        await saveTodos(todos, options.file);
        console.log(`Added todo: ${todo} to ${options.file}`)
    })

program.command('delete-todo')
    .description('Delete todo by specifying the index')
    .option('-f, --file <filename>', 'specify the file name', 'todos.json')
    .argument('<index>', 'index')
    .action(async(index, options) => {
        const todos = await loadTodos(options.file);
        if (index < 0 || index > todos.length) return console.log('Invalid index');
        else {
            const [removed] = todos.splice(index, 1);
            await saveTodos(todos, options.file);
            console.log(`Removed todo: ${removed.todo} from ${options.file}`);
        }
    })

program.command('mark-done')
    .description('Mark a todo done by specifying the index')
    .option('-f, --file <filename>', 'specify the file name', 'todos.json')
    .argument('<index>', 'index')
    .action(async (index, options) => {
        const todos = await loadTodos(options.file);
        todos[index]['done'] = true;
        await saveTodos(todos, options.file);
        console.log(`Updated the todo: ${todos[index]} as done in ${options.file}`);
    })

    program.parse(process.argv);