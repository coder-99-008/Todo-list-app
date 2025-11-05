import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANsLI1_lxMGBcnsiYsgfT8EMfBalZ10ls",
  authDomain: "todo-list-app-34ce2.firebaseapp.com",
  projectId: "todo-list-app-34ce2",
  storageBucket: "todo-list-app-34ce2.appspot.com",
  messagingSenderId: "974847368003",
  appId: "1:974847368003:web:fcbeb7fae844c5f7e3adf6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userId = 'atharv';
const userRef = doc(db, 'users', userId);

const input = document.getElementById("todo-input");
const btn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// load all tasks once
async function loadTasks() {
    const docSnap = await getDoc(userRef);
    list.innerHTML = '';
    if (docSnap.exists()) {
        const tasks = docSnap.data().tasks || [];
        tasks.forEach((task, i) => addTaskToDOM(task.text, i));
    }
}

// add new task (updates array in Firestore).
btn.addEventListener('click', async () => {
    if (!input.value.trim()) return;
    const docSnap = await getDoc(userRef);
    const existingTasks = docSnap.exists() ? docSnap.data().tasks || [] : [];
    const newTasks = [...existingTasks, { text: input.value }];
    await setDoc(userRef, { tasks: newTasks });
    input.value = '';
    addTaskToDOM(newTasks[newTasks.length - 1].text, newTasks.length - 1);
});

// add task visually
function addTaskToDOM (text, index){
    const li = document.createElement('li');
    li.textContent = text;

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = 'Delete';
    del.addEventListener('click', async () => {
        const docSnap = await getDoc(userRef);
        const tasks = docSnap.data().tasks || [];
        tasks.splice(index, 1);
        await updateDoc(userRef, { tasks });
        li.remove();
    });

    li.appendChild(del)
    list.appendChild(li);
}

loadTasks();