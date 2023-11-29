// A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening. // 

// API call // 
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`

// state variable // 
const state = {
    events: [],
};

// references pointing to my HTML // 
const eventsList = document.querySelector("#eventsList");

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

// display API info // 
function renderEvents() { 
    const eventsData = state.events.map((event) => {
        const element = document.createElement("li");
        element.innerHTML = 
            `<h3> ${event.name} </h3>
            <h4> ${event.date} </h4>
            <h5> ${event.location} </h5>
            <p> ${event.description} </p>`;
        element.style.border = "black 1px solid";
        element.style.listStyle = "none";
        element.style.padding = "3px";
        return element;
    });
    eventsList.replaceChildren(...eventsData);
};
