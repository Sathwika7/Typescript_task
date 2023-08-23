function addTask(): void 
{
    const taskInput: HTMLInputElement = document.getElementById("taskInput") as HTMLInputElement;
    const taskText: string = taskInput.value.trim();

    if (taskText !== "") 
    {
        const existingTasks: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".task-row span");
        let isDuplicate: boolean = false;

        existingTasks.forEach(existingTask => 
        {
            if(existingTask.textContent.toLowerCase() === taskText.toLowerCase()) 
            {
                const textContent: string | null = existingTask.textContent;
                if (textContent !== null && textContent.toLowerCase() === taskText.toLowerCase()) {
                    const taskStyle: CSSStyleDeclaration = window.getComputedStyle(existingTask);
                    if (taskStyle.textDecoration.includes("line-through")) 
                    {
                        isDuplicate = false;
                        return;
                    }
                    isDuplicate = true;
                    return;
                }
            }
        });
        if (!isDuplicate) 
        {
            const newRow: HTMLTableRowElement = taskListTable.insertRow();
            newRow.className = "task-row";
            const checkboxCell: HTMLTableCellElement = newRow.insertCell();
            const textCell: HTMLTableCellElement = newRow.insertCell();
            const statusCell: HTMLTableCellElement = newRow.insertCell();
            const deleteCell: HTMLTableCellElement = newRow.insertCell();

            checkboxCell.innerHTML = '<input type="checkbox" disabled=true/>';
            textCell.innerHTML = `<span>${taskText}</span>`;
            statusCell.innerHTML = `
                <select onchange="updateTaskStatus(this)">
                    <option value="todo">To-do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>`;
            deleteCell.innerHTML = '<button style="background-color: #07185e; padding: 3px 7px;" class="deleteButton" onclick="deleteTask(this)">Delete</button>';

            taskInput.value = ""; // Clear input field
        } 
        else 
        {
            alert("Task already exists");
        }
    }
}

function updateTaskStatus(selectElement: HTMLSelectElement): void 
{
    const taskRow: HTMLTableRowElement | null = selectElement.closest("tr");
    if (taskRow) 
    {
        const taskTextCell: HTMLSpanElement | null = taskRow.querySelector("span");
        const checkbox: HTMLInputElement | null = taskRow.querySelector("input[type='checkbox']");
        if (taskTextCell && checkbox) 
        {
            if (selectElement.value === "completed") 
            {
                taskTextCell.style.textDecoration = "line-through";
                checkbox.checked = true;
            } 
            else 
            {
                taskTextCell.style.textDecoration = "none";
                checkbox.checked = false;
            }
        }
    }
}

function deleteTask(button: HTMLButtonElement): void 
{
    const taskRow: HTMLTableRowElement | null = button.closest("tr");
    if(taskRow) 
    {
        taskRow.remove();
    }
}

function searchTask(): void 
{
    const searchInput: HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;
    const searchQuery: string = searchInput.value.trim().toLowerCase();
    const rows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll(".task-table .task-row");
    rows.forEach(row => 
    {
        const taskTextCell: HTMLSpanElement | null = row.querySelector("span");
        if(taskTextCell) 
        {
            const taskText: string = taskTextCell.textContent.toLowerCase();
            if (taskText.includes(searchQuery)) 
            {
                row.style.display = "table-row";
            } 
            else 
            {
                row.style.display = "none";
            }
        }
    });
}
