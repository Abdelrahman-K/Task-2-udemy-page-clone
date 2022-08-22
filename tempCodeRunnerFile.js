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
        <i class="fas fa-star-half-alt"></i>
        (${course.enroller}) 
    </div>
    <h4>${course.price}</h4>
    </div>
  `;
  return to;
}