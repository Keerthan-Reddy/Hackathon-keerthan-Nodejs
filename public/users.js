async function getData() {
  const url = "http://localhost:8080/";
  const response = await fetch(url);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
}

function mydelete(id) {
  fetch(`/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Item deleted successfully:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  fetchData();
}

function fetchData() {
  fetch("http://localhost:8080/")
    .then((response) => response.json())
    .then((data) => {
      const f = data.filter(
        (customer) =>
          customer.customer_name &&
          customer.email &&
          customer.phone &&
          customer.date_of_birth &&
          customer.occupation &&
          customer.membership_status &&
          customer.last_purchase_date
      );
      const tableBody = document.getElementById("tabledata");
      tableBody.innerHTML = "";
      data.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.customer_name || 0}</td>
          <td>${customer.email || 0}</td>
          <td>${customer.phone || 0}</td>
          <td>${customer.address || 0}</td>
          <td>${customer.date_of_birth.split("T")[0] || 0}</td>
          <td>${customer.occupation || 0}</td>
          <td>${customer.membership_status || 0}</td>
          <td>${customer.last_purchase_date.split("T")[0] || 0}</td>
          <td>
            <a href="/edit/${
              customer.id
            }"><button class="btn btn-warning" >Edit</button></a>
            <form action="/${
              customer.id
            }?_method=DELETE" method="POST" style="display: inline;">
              <button class="btn btn-danger" type="submit">Delete</button>
            </form>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

fetchexercise();
function fetchexercise() {
  fetch("/user-page")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("tabledata-2");
      tableBody.innerHTML = "";
      data.forEach((exercise) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${exercise.exercise_name}</td>
          <td>${exercise.target_body_part}</td>
          <td>${exercise.discription}</td>
          <td><a target="_blank" href="${exercise.youtube}">${exercise.youtube}</a></td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

async function fetchCustomer() {
  const id = document.getElementById("customer-id").value;
  try {
    const response = await fetch(`/search?id=${id}`);
    if (response.ok) {
      const data = await response.json();
      alert(`Customer Data: ${JSON.stringify(data, null, 2)}`);
    } else {
      alert("Customer not found");
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    alert("An error occurred");
  }
}

window.onload = fetchData;
