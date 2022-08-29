let data = []
let cur_data = []
let cat = [
    "Python",
    "Exel",
    "Web Development",
    "JavaScript",
    "Data Science",
    "AWS Certification",
    "Drawing"
];
let currentTab = 0;

let fetch_data = async (url) => {
    let response = await fetch(url)
    let j = await response.json()
    return j;
};

let create_child = (course, ind) => {
    let to = document.createElement("div");
    to.classList.add("carousel-item");
    if (ind == 0)
        to.classList.add("active");
    to.innerHTML = `
    <div class="card col-xs-4">
        <div class="img-wrapper"><img src=${course.image_src} class="d-block w-100" alt="..."> </div>
            <div class="card-body">
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
        </div>
    </div>
  `;
    return to;
};

const add_courses = (data, minPerSlide) => {
    const par = document.querySelector(".carousel-inner");
    par.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        par.appendChild(create_child(data[i], i));
    }
    //
    let items = document.querySelectorAll('.carousel .carousel-item')
    items.forEach((el) => {
        if (data.length < minPerSlide)
            minPerSlide = data.length;
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) // wrap carousel by using first child
                next = items[0]
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })
};

const start_script = async () => {
    data = await fetch_data("http://localhost:3000/courses");
    add_courses(data, 4);
    change_tab(0);
    $('.carousel').carousel('pause');
};

start_script();

const change_tab = (tabNumber) => {
    currentTab = tabNumber;
    document.querySelector(".explore-btn").textContent = "Explore " + cat[tabNumber];
    // document.querySelector(".intro-paragraph h3").textContent = ;
    // document.querySelector(".intro-paragraph p").textContent = ;
    cur_data = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].cat === tabNumber)
            cur_data.push(data[i]);
    }
    add_courses(cur_data, 4);
}


const search_bar = document.querySelector("#search-input");
search_bar.addEventListener("change", function (event) {
    event.preventDefault();
    let val = document.querySelector("#search-input").value;
    if (val.length === 0) {
        add_courses(cur_data);
        return;
    }
    cur_data = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(val.toLowerCase()) && data[i].cat == currentTab)
            cur_data.push(data[i]);
    }
    // data.filter(data.title.includes(val));
    add_courses(cur_data, 4);
});



function screenTest() {
    if (window.innerWidth <= 600)
        add_courses(cur_data, 1);
    else if (window.innerWidth <= 1000)
        add_courses(cur_data, 2);
    else if (window.innerWidth <= 1400)
        add_courses(cur_data, 3);
    else
        add_courses(cur_data, 4);
}
window.addEventListener('resize', screenTest);