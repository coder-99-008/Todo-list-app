import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔥 Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyANsLI1_lxMGBcnsiYsgfT8EMfBalZ10ls",
    authDomain: "todo-list-app-34ce2.firebaseapp.com",
    projectId: "todo-list-app-34ce2",
    storageBucket: "todo-list-app-34ce2.firebasestorage.app",
    messagingSenderId: "974847368003",
    appId: "1:974847368003:web:fcbeb7fae844c5f7e3adf6",
    measurementId: "G-4D13ZLCQQN",
};

// Initialize Firebase + Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ==========================
// Todo App Code Starts Here
// ==========================

const add_input = document.getElementById('todo-input');
const add_btn = document.getElementById('add-btn');
const todo_list = document.getElementById('todo-list');


add_btn.addEventListener('click', async () => {
    if (add_input.value === '') return;

    await addTask(add_input.value);
    add_input.value = '';
    loadTasks();
})

async function addTask(value) {
    await addDoc(collection(db, "tasks"), { text: value });
}

async function loadTasks() {
    todo_list.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    querySnapshot.forEach((docSnap) => {
        let tasks = document.createElement('li');
        tasks.textContent = docSnap.data().text;

        let del_btn = document.createElement('button');
        del_btn.className = 'delete-btn';
        del_btn.textContent = 'Delete';

        del_btn.addEventListener('click', async () => {
            await deleteDoc(doc(db, "tasks", docSnap.id));
            loadTasks();
        })

        tasks.appendChild(del_btn);
        todo_list.appendChild(tasks);
    });
}

loadTasks();