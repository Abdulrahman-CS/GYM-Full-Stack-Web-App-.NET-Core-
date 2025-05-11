document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const tableBody = document.getElementById("coachTableBody");

    // Fetch data from API
    const fetchData = async (pageSize = 100, pageNumber = 1) => {
        try {
            const response = await fetch(`http://localhost:5020/api/Home/GetCoachesRating?pageSize=${pageSize}&pageNumber=${pageNumber}`);
            const data = await response.json();

            if (data && Array.isArray(data)) {
                populateTable(data);
            } else {
                console.error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Populate the table with coach data
    const populateTable = (data) => {
        tableBody.innerHTML = "";  // Clear any existing rows
        data.forEach(coach => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${coach.id}</td>
                <td>${coach.first_Name}</td>
                <td>${coach.last_Name}</td>
                <td>${coach.bio}</td>
                <td>${coach.age}</td>
                <td>${coach.total_ratings}</td>
                <td>${coach.average_rating}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Search functionality
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = Array.from(tableBody.querySelectorAll("tr"));

        rows.forEach(row => {
            const cells = Array.from(row.children);
            const matches = cells.some(cell => cell.textContent.toLowerCase().includes(searchTerm));
            row.style.display = matches ? "" : "none";
        });
    });

    // Sorting functionality
    const tableHeaders = document.querySelectorAll("#coachTable th");
    tableHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const column = header.getAttribute("data-column");
            const order = header.dataset.order = -(header.dataset.order || -1);
            const rows = Array.from(tableBody.querySelectorAll("tr"));

            rows.sort((a, b) => {
                const aText = a.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
                const bText = b.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();

                return aText.localeCompare(bText, undefined, {numeric: true}) * order;
            });

            rows.forEach(row => tableBody.appendChild(row));
        });
    });

    // Initial fetch call to load data
    fetchData();
});
