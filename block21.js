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
const eventsForm = document.querySelector("form");
const addButton = document.querySelector("#addButton");
const deleteButton = document.querySelector(".delete");

// get info from API //
const getEvents = async () => {
    try {
        const response = await fetch(API);
        const json = await response.json();
        state.events = json.data;
    }
    catch (error) {
        console.log(error.message);
    }
};

// add info to API // 
const createEvent = async (e) => {
    e.preventDefault();
    const dateControl = `${eventsForm.eventDate.value}:00Z`;
    const createdEvent = {
        name: eventsForm.eventName.value,
                date: dateControl,
                location: eventsForm.eventLocation.value,
                description: eventsForm.eventDescription.value,
    }
    console.log(createdEvent);
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: eventsForm.eventName.value,
                date: dateControl,
                location: eventsForm.eventLocation.value,
                description: eventsForm.eventDescription.value,
            }),
        });
        const newEvent = await response.json();
        console.log(newEvent);
        if (!response.ok) {
            throw new Error("Failed to create event");
          };
          renderEvents();
    }
    catch (error) {
        console.log(error.message);
    }
}
//addButton event listener//
eventsForm.addEventListener("submit",createEvent);

// delete info // 
// const deleteEvent = async (id) => {
//     try {
//         const response = await fetch(API+"/"+id, {
//             method: "DELETE",
//         })
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }
//deleteButton event listener//
deleteButton.addEventListener("click", deleteEvent);

// display API info // 
const renderEvents = () => { 
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
    eventsList.classList.add("hi");
    eventsList.replaceChildren(...eventsData);
};

// initial render - run the functions to get & display API info // 
const init = async () => {
    await getEvents(); 
    renderEvents();
};
init(); 
