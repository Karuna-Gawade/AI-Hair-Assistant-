import {auth,db} from "./firebase.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 // Redirect if not logged in
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location = "login.html";
      } else {
        document.getElementById("welcome").innerText = `Welcome, ${user.email}`;
        loadUserData();
      }
    });

    // Logout function
    function logout() {
      signOut(auth).then(() => {
        window.location = "login.html";
      });
    }

    // Firestore: save user data
    async function saveData() {
      const hairProblem = document.getElementById("hairProblem").value;
      const hairGoal = document.getElementById("hairGoal").value;

      try {
        await addDoc(collection(db, "userData"), {
          uid: auth.currentUser.uid,
          hairProblem,
          hairGoal,
          timestamp: new Date()
        });
        alert("Data saved!");
        loadUserData(); // Refresh table
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    // Load user data from Firestore
    async function loadUserData() {
      const table = document.getElementById("dataTable");
      table.innerHTML = "<tr><th>Problem</th><th>Goal</th><th>Date</th></tr>";
      const querySnapshot = await getDocs(collection(db, "userData"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid === auth.currentUser.uid) {
          const row = table.insertRow();
          row.insertCell(0).innerText = data.hairProblem;
          row.insertCell(1).innerText = data.hairGoal;
          row.insertCell(2).innerText = data.timestamp.toDate();
        }
      });
    }

    window.logout = logout;
    window.saveData = saveData;
    document.addEventListener("DOMContentLoaded",() =>{
    document.getElementById("generateRoutine").addEventListener("click", async () => { console.log("Generate Routine button clicked");
  // Collect user inputs
  const hairType = document.getElementById("hairType").value;
  const scalpType = document.getElementById("scalpType").value;
  const problems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  const climate = document.getElementById("climate").value;
  const washFrequency = document.getElementById("washFrequency").value;

  // Build prompt
 const prompt = `You are an AI hair care assistant. 
Generate a personalized hair care routine based on the following details:

Hair Type: ${hairType}
Scalp Type: ${scalpType}
Hair Problems: ${problems.join(", ")}
Climate: ${climate}
Wash Frequency: ${washFrequency}

Provide a detailed daily and weekly routine including hair wash time table, shampoo, conditioner, medical treatments, diet plan and exercise . 
Write in simple, clear language suitable for a user to follow.`;
  // Call Gemini API
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=api key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    console.log(data);
    const routine = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No routine generated.";
    document.getElementById("aiRoutine").innerText = routine;
  } catch (error) {
    console.error(error);
    document.getElementById("aiRoutine").innerText = "Error generating routine.";
  }
}); });  
 


