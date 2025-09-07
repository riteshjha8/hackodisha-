
const state = {
  interns: [],
  notifications: 3,
};
const notifCount = document.querySelector(".notifications .count");


let liveChart;

function renderCharts() {
 
  new Chart(document.getElementById("internPerformance"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Performance Score",
        data: [65, 72, 80, 75, 90, 95],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.2)",
        tension: 0.4,
        fill: true
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

 
  new Chart(document.getElementById("projectStats"), {
    type: "bar",
    data: {
      labels: ["Frontend", "Backend", "AI/ML", "UI/UX"],
      datasets: [{
        label: "Projects",
        data: [12, 9, 5, 6],
        backgroundColor: ["#06b6d4", "#7c3aed", "#10b981", "#f59e0b"]
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

 
  new Chart(document.getElementById("hiringTrends"), {
    type: "line",
    data: {
      labels: ["2021", "2022", "2023", "2024", "2025"],
      datasets: [{
        label: "Hires per Year",
        data: [15, 28, 34, 48, 55],
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124,58,237,0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });


  new Chart(document.getElementById("roleDistribution"), {
    type: "pie",
    data: {
      labels: ["Frontend", "Backend", "UI/UX", "AI/ML"],
      datasets: [{
        data: [30, 25, 20, 25],
        backgroundColor: ["#06b6d4", "#7c3aed", "#10b981", "#f59e0b"]
      }]
    },
    options: { responsive: true }
  });


  const ctx = document.getElementById("liveActivity").getContext("2d");
  liveChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Active Interns Online",
        data: [],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      animation: false,
      scales: {
        x: { title: { display: true, text: "Time (HH:MM:SS)" } },
        y: { title: { display: true, text: "Interns" }, min: 0, max: 50 }
      }
    }
  });

 
  setInterval(async () => {
    const now = new Date().toLocaleTimeString();
    try {
      
      const res = await fetch("https://dummyjson.com/users?limit=1&skip=" + Math.floor(Math.random() * 90));
      await res.json(); 

     
      const activeInterns = Math.floor(Math.random() * 50) + 1;

      liveChart.data.labels.push(now);
      liveChart.data.datasets[0].data.push(activeInterns);

      if (liveChart.data.labels.length > 10) {
        liveChart.data.labels.shift();
        liveChart.data.datasets[0].data.shift();
      }
      liveChart.update();
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, 2000);
}


function init() {
  if (state.notifications > 0) {
    notifCount.textContent = state.notifications;
    notifCount.style.display = "block";
  } else {
    notifCount.style.display = "none";
  }
  renderCharts();
}
init();
