document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, category, description })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
    });
});

function fetchExpenses() {
    fetch("/expenses")
        .then(res => res.json())
        .then(data => {
            let output = "<h3>Expenses</h3>";
            data.forEach(exp => {
                output += `<p>${exp.date} - ${exp.category}: $${exp.amount} (${exp.description})</p>`;
            });
            document.getElementById("output").innerHTML = output;
        });
}

function fetchMonthlySummary() {
    fetch("/summary/monthly")
        .then(res => res.json())
        .then(data => {
            let output = "<h3>Monthly Summary</h3>";
            for (let month in data) {
                output += `<p>${month}: $${data[month].toFixed(2)}</p>`;
            }
            document.getElementById("output").innerHTML = output;
        });
}

function fetchCategorySummary() {
    fetch("/summary/category")
        .then(res => res.json())
        .then(data => {
            let output = "<h3>Category Summary</h3>";
            for (let cat in data) {
                output += `<p>${cat}: $${data[cat].toFixed(2)}</p>`;
            }
            document.getElementById("output").innerHTML = output;
        });
}
