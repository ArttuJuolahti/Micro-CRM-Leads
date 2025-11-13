// Get references to key elements in the HTML for later use.
const grid = document.querySelector('#grid tbody');
const form = document.querySelector('#newLead');
const q = document.querySelector('#q');
const statusSel = document.querySelector('#status');
// Attach an event listener to the "Apply" filter button, making it call 'load()' when clicked.
document.querySelector('#applyFilters').addEventListener('click', load);
// 'async(e)' means this function can use 'await' for network requests.
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
 // Send the data to the server's POST endpoint using 'fetch'. 'await' pauses the function until the server responds.
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
 // If the server responded with an error (e.g., 400 validation error), show an alert.
  if (!res.ok) {alert('validation failed'); return;}
  form.reset();
  await load();
});
// This is the main function to fetch and display all leads from the server.
async function load() {
  const params = new URLSearchParams();
  if (q.value) params.set('q', q.value);
  if (statusSel.value) params.set('status', statusSel.value);
    const res = await fetch("/api/leads?" + params.toString());
    const leads = await res.json();
    grid.innerHTML = leads.map (row).join('');
     bindActions();
}
// This function is a template. It takes a lead object 'l' and returns an HTML string for its table row.
function row(l) {
    return `<tr>
        <td>${l.name}</td>
        <td>${l.email}</td>
        <td>${l.company || ""}</td>
        <td>${l.status}</td>
        <td>
        <!-- Use 'data-id' to store the lead's ID on the button -->
        <!-- Use 'data-s' to store the new status this button will set -->
            <button class ="link" data-id="${l.id}" data-s="Contacted" class="status-btn">Mark Contacted</button>
            <button class ="link" data-id="${l.id}" data-s="Qualified" class="status-btn">Mark Qualified</button>
            <button class ="link" data-id="${l.id}" data-s="Lost" class="status-btn">Mark Lost</button>
        </td>
    </tr>`;
}
// This function attaches click listeners to all action buttons currently in the grid.
function bindActions() {
    document.querySelectorAll('#grid button.link').forEach(b => {
        b.addEventListener('click', async (e) => {
            await fetch('/api/leads/' + b.dataset.id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: b.dataset.s })
            });
            load();
        });
    });
}
load();