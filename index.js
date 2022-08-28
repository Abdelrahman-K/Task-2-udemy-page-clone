// import fetch from "node-fetch";
let data = []
let cat = [
    "Python",
    "Exel",
    "Web Development", 
    "JavaScript",
    "Data Science",
    "AWS Certification",
    "Drawing"
];

let fetch_data = async (url) => {
    let response = await fetch(url)
    let j = await response.json()
    return j;
};

let create_child = (course) => {
    let to = document.createElement("div");
    to.classList.add("course-template");
    to.innerHTML = `
    <img src=${course.image_src} />
    <div class="course-description">
    <h4>${course.title}</h4>
    <div class="author">${course.author}</div>
    <div class="rating">
        ${course.rating}
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star-half"></i>
        ${course.enroller} 
    </div>
    <h4>${course.price}</h4>
    </div>
  `;
  return to;
};

const add_courses = (data) => {
    const par = document.querySelector(".courses");
    par.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        par.appendChild(create_child(data[i]));
    }
};

const start_script = async()=> {
    data = await fetch_data("http://localhost:3000/courses");
    add_courses(data);
    change_tab(0);
};

start_script();

const search_bar = document.querySelector("#search-input");
search_bar.addEventListener("change", function(event) {
    event.preventDefault();
    let val = document.querySelector("#search-input").value;
    if (val.length === 0) {
        add_courses(data);
        return;
    }
    let new_data = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(val.toLowerCase()))
            new_data.push(data[i]);
    }
    // data.filter(data.title.includes(val));
    add_courses(new_data);
});

const change_tab = (tabNumber) => {
    document.querySelector(".explore-btn").textContent = "Explore " + cat[tabNumber];
    // document.querySelector(".intro-paragraph h3").textContent = ;
    // document.querySelector(".intro-paragraph p").textContent = ;

    let new_data = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].cat === tabNumber)
            new_data.push(data[i]);
    }
    add_courses(new_data);
}