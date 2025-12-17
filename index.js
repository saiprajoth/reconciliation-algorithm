// Initial state → 3 elements
let state = [
  {
    id: 1,
    title: "Buy Groceries",
    description: "Milk, Eggs, Bread",
    completed: false,
  },
  { id: 2, title: "Morning Jog", description: "Run 5km", completed: false },
  {
    id: 3,
    title: "Read Book",
    description: "Finish reading 'Atomic Habits'",
    completed: true,
  },
];

// First update → 5 elements (mix of updated, common, added)
let newTodos = [
  {
    id: 1,
    title: "Buy Groceries",
    description: "Milk, Eggs, Bread, Cheese",
    completed: true,
  }, // updated
  { id: 2, title: "Morning Jog", description: "Run 5km", completed: false }, // common
  {
    id: 4,
    title: "Clean Room",
    description: "Organize desk and wardrobe",
    completed: false,
  }, // added
  {
    id: 5,
    title: "Pay Bills",
    description: "Electricity and Internet",
    completed: true,
  }, // added
  {
    id: 6,
    title: "Fix Bike",
    description: "Change oil and tires",
    completed: false,
  }, // added
];

// Second update → 4 elements (mix of updated, common, removed, added)
let moreTodos = [
  {
    id: 1,
    title: "Buy Groceries",
    description: "Milk, Eggs, Bread, Cheese",
    completed: true,
  }, // common
  {
    id: 4,
    title: "Clean Room",
    description: "Organize desk and wardrobe",
    completed: true,
  }, // updated
  {
    id: 5,
    title: "Pay Bills",
    description: "Electricity and Internet",
    completed: true,
  }, // common
  {
    id: 7,
    title: "Call Mom",
    description: "Check how she is doing",
    completed: false,
  }, // added
];

function updateStatus(stateParam, newTodos) {
  const { added, removed, updated, common } = diff(newTodos, stateParam);

  addTodo(added);
  removeTodo(removed);
  updateTodo(updated);

  return [...added, ...updated, ...common];
}

// diff is used by updateStatus

function diff(newTodos, state) {
  const added = newTodos.filter((tnew) => {
    return !state.some((told) => {
      return tnew.id === told.id;
    });
  });

  const removed = state.filter((told) => {
    return !newTodos.some((tnew) => {
      return told.id === tnew.id;
    });
  });

  const updated = state.filter((told) => {
    return newTodos.some((tnew) => {
      return (
        told.id === tnew.id &&
        (told.title !== tnew.title ||
          told.description !== tnew.description ||
          told.completed !== tnew.completed)
      );
    });
  });

  const common = state.filter((told) => {
    return newTodos.some((tnew) => {
      return (
        told.id === tnew.id &&
        (told.title === tnew.title ||
          told.description === tnew.description ||
          told.completed === tnew.completed)
      );
    });
  });

  return { added, removed, updated, common };
}

// CRUD Todo operations

function addTodo(Todos) {
  Todos.map((todo) => {
    const TodoEl = document.createElement("div");
    TodoEl.setAttribute("id", todo.id);

    const titleEl = document.createElement("p");
    titleEl.innerHTML = todo.title;

    const descEl = document.createElement("p");
    descEl.innerHTML = todo.description;

    const completedEl = document.createElement("p");
    completedEl.innerHTML = todo.completed ? "Done" : "Not Done";

    // append children to the main div
    TodoEl.appendChild(titleEl);
    TodoEl.appendChild(descEl);
    TodoEl.appendChild(completedEl);

    // append the todo div to the body or a container
    const container = document.getElementById("root");
    container.appendChild(TodoEl);
  });
}

function removeTodo(Todos) {
  Todos.forEach((todo) => {
    const TodoEl = document.getElementById(todo.id);
    if (TodoEl) {
      const container = document.getElementById("root");
      container.removeChild(TodoEl);
    }
  });
}

function updateTodo(Todos) {
  Todos.map((todo) => {
    let TodoEl = document.getElementById(todo.id);
    if (TodoEl) {
      TodoEl.children[0].innerHTML = todo.title;
      TodoEl.children[1].innerHTML = todo.description;
      TodoEl.children[2].innerHTML = todo.completed ? "Done" : "Not Done";
    }
  });
}

function firstRender(currentState) {
  const container = document.getElementById("root");
  container.innerHTML = ""; // clear any previous content
  addTodo(currentState); // use your existing addTodo
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {

  firstRender(state);
  console.log("First render done");


  await sleep(10000);
  console.log("Pausing for 10s done");


  state = updateStatus(state, newTodos);
  console.log("Updated state after newTodos:", state);


  await sleep(10000);
  console.log("Pausing for 10s done");


  state = updateStatus(state, moreTodos);
  console.log("Updated state after moreTodos:", state);
}

run();
