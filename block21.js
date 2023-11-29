// A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening. // 
// Next to each party in the list is a delete button. The user clicks the delete button for one of the parties. That party is then removed from the list.
// There is also a form that allows the user to enter information about a new party that they want to schedule. After filling out the form and submitting it, the user observes their party added to the list of parties.


// API call // 
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`

// state variable // 
const state = {
    events: [],
};

// references pointing to my HTML // 
const eventsList = document.querySelector("#eventsList");
const deleteButton = document.querySelector(".delete");

// initial render - run the functions to get & display API info // 
async function render() {
    await getEvents(); 
    renderEvents();
}
render (); 

// get info from API //
async function getEvents() {
    try {
        const response = await fetch(API);
        const json = await response.json();
        state.events = json.data;
    }
    catch (error) {
        console.log(error.message);
    }
};

// date and time //

// display API info // 
function renderEvents() { 
    if (state.events.length === 0) {
        const element = document.createElement("li");
        element.innerHTML = `Sorry, there are no parties planned.`
        element.style.listStyle = "none";
        eventsList.replaceChildren(element);
        return element;
    };

    const eventsData = state.events.map((event) => {
        const date = event.date.split("T")[0];
        const time = event.date.split("T")[1].split(":")[0]+":"+event.date.split("T")[1].split(":")[0];
        const element = document.createElement("li");
        element.innerHTML = 
            `<h3> ${event.name} </h3>
            <h4> ${date} at ${time} </h4>
            <h5> ${event.location} </h5>
            <p> ${event.description} </p>
            <button class="delete" id=${event.id}> DELETE </button> ` ;
        element.style.border = "black 1px solid";
        element.style.listStyle = "none";
        element.style.padding = "3px";
        return element;
    });
    eventsList.replaceChildren(...eventsData);
};


