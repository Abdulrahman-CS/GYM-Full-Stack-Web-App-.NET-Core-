document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const searchInput = document.getElementById("searchInput");
  const brandFilter = document.getElementById("brandFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const muscleFilter = document.getElementById("muscleFilter");
  const resetButton = document.getElementById("resetFilters");
  const tbody = document.getElementById("equipmentBody");

  let equipmentData = []; // To store the fetched data

  // Fetch equipment data
  const pageSize = 100;
  const pageNumber = 1;

  fetch(
    `http://localhost:5020/api/Home/GetEquipment?pageSize=${pageSize}&pageNumber=${pageNumber}`
  )
    .then((response) => response.json())
    .then((data) => {
      equipmentData = data;
      populateFilters(data);
      populateTable(equipmentData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Populate the table with fetched data
  function populateTable(data) {
    tbody.innerHTML = ""; // Clear the existing table body
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.brand}</td>
                        <td>${item.category}</td>
                        <td>${item.targetMuscle}</td>
                        <td>${item.description}</td>
                    `;
      tbody.appendChild(row);
    });
  }

  // Populate filter options dynamically
  function populateFilters(data) {
    // Populate brand filter options
    const brands = [...new Set(data.map((item) => item.brand))];
    brands.forEach((brand) => {
      const option = document.createElement("option");
      option.value = brand;
      option.textContent = brand;
      brandFilter.appendChild(option);
    });

    // Populate category filter options
    const categories = [...new Set(data.map((item) => item.category))];
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    // Populate target muscle filter options
    const muscles = [...new Set(data.map((item) => item.targetMuscle))];
    muscles.forEach((muscle) => {
      const option = document.createElement("option");
      option.value = muscle;
      option.textContent = muscle;
      muscleFilter.appendChild(option);
    });
  }

  // Function to filter the table
  function filterTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const brandValue = brandFilter.value;
    const categoryValue = categoryFilter.value;
    const muscleValue = muscleFilter.value;

    // Filter data based on search term and filters
    const filteredData = equipmentData.filter((item) => {
      const name = item.name.toLowerCase();
      const brand = item.brand;
      const category = item.category;
      const muscle = item.targetMuscle;
      const description = item.description.toLowerCase();

      const matchesSearch =
        name.includes(searchTerm) || description.includes(searchTerm);
      const matchesBrand = brandValue === "" || brand === brandValue;
      const matchesCategory =
        categoryValue === "" || category === categoryValue;
      const matchesMuscle = muscleValue === "" || muscle === muscleValue;

      return matchesSearch && matchesBrand && matchesCategory && matchesMuscle;
    });

    populateTable(filteredData); // Update table with filtered data
  }

  // Reset filters
  resetButton.addEventListener("click", function () {
    searchInput.value = "";
    brandFilter.value = "";
    categoryFilter.value = "";
    muscleFilter.value = "";

    // Re-populate the table with all equipment data
    populateTable(equipmentData);
  });

  // Event listeners for filter inputs
  searchInput.addEventListener("input", filterTable);
  brandFilter.addEventListener("change", filterTable);
  categoryFilter.addEventListener("change", filterTable);
  muscleFilter.addEventListener("change", filterTable);
});
