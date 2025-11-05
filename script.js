import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyANsLI1_lxMGBcnsiYsgfT8EMfBalZ10ls",
    authDomain: "todo-list-app-34ce2.firebaseapp.com",
    projectId: "todo-list-app-34ce2",
    storageBucket: "todo-list-app-34ce2.appspot.com",
    messagingSenderId: "974847368003",
    appId: "1:974847368003:web:fcbeb7fae844c5f7e3adf6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const input = document.getElementById("todo-input");
const btn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

btn.addEventListener("click", async () => {
    if (!input.value.trim()) return;
    const docRef = await addDoc(collection(db, "tasks"), { text: input.value });
    addTaskToDOM(input.value, docRef.id);
    input.value = "";
});

function addTaskToDOM(text, id) {
    const li = document.createElement("li");
    li.textContent = text;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";

    del.addEventListener("click", async () => {
        await deleteDoc(doc(db, "tasks", id));
        li.remove();
    });

    li.appendChild(del);
    list.appendChild(li);
}

async function loadTasks() {
    list.innerHTML = "";
    const snapshot = await getDocs(collection(db, "tasks"));
    snapshot.forEach((docSnap) => {
        addTaskToDOM(docSnap.data().text, docSnap.id);
    });
}

loadTasks();
