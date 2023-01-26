
window.onload = () => {

    const carousel = document.getElementById("carousel");
    const leftArrow = document.getElementById("left-arr");
    const rightArrow = document.getElementById("right-arr");
    const reviews = [
        {
            name: "Иван Иванов",
            img: "imgs/customer1.jpg",
            text: "Nunc tincidunt metus eu erat viverra feugiat. In et leo elit. Etiam tempor lectus et laoreet sollicitudin. Suspendisse scelerisque dui."
        },
        {
            name: "Пётр Петров",
            img: "imgs/customer2.jpg",
            text: "Integer et lacus quis tortor molestie tristique non a dolor. Cras accumsan faucibus nisl, in ultricies lorem tempor eget. Morbi."
        },
        {
            name: "Василий Васильев",
            img: "imgs/customer3.jpg",
            text: "Nullam tincidunt, nisi in efficitur finibus, velit est elementum augue, non fermentum ante ipsum gravida nulla. Pellentesque ac lorem leo."
        },
    ]

    for (let review of reviews) {
        const index = reviews.indexOf(review);
        let reviewElement = document.createElement('div');
        reviewElement.style.order = index;
        reviewElement.className = "review" + (reviewElement.style.order === "1" ? " active" : "");
        if (Number(reviewElement.style.order) >= 3) {
            reviewElement.style.display = 'none';
        }
        reviewElement.id = "review";
        reviewElement.innerHTML = `
        <div class="overlay"></div>
        <img class="customer-img" src=${review.img} alt="customer image ${review.name}">
        <span class="customer-name">${review.name}</span>
        <p class="review-text">${review.text}</p>`;
        carousel.appendChild(reviewElement);
    }



    leftArrow.addEventListener('click', () => swipe(false));
    rightArrow.addEventListener('click', () => swipe(true));



    function swipe(right) {
        const last = String(reviews.length - 1);
        for (let review of document.querySelectorAll("#review")) {
            if (review.classList.contains('active')) {
                review.classList.remove('active');
            }
            if (right) {
                if (review.style.order === last) {
                    review.style.order = 0;
                }
                else {
                    review.style.order = Number(review.style.order) + 1;
                }
            }
            else {
                if (review.style.order === "0") {
                    review.style.order = last;
                }
                else {
                    review.style.order = Number(review.style.order) - 1;
                }
            }
            if (Number(review.style.order) >= 3) {
                review.style.display = 'none';
            }
            else {
                review.style.display = 'flex';
            }
            if (review.style.order === "1") {
                review.classList.add("active")
            }
        }

    }



    for (let button of document.querySelectorAll("#order-button")) {
        button.addEventListener('click', () => {
            const scrollTarget = document.getElementById("order");
            const elementPosition = scrollTarget ? scrollTarget.getBoundingClientRect().top : 0;
            const offsetPosition = elementPosition;
            setTimeout(() => {
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 50);

        })
    }


    if (!localStorage.getItem("date")) {
        const start = new Date();
        const minutes = start.getMinutes();
        start.setMinutes(minutes + (minutes > 30 ? (-30) : 30));

        localStorage.setItem("date", JSON.stringify(start));
    }
    const countDown = new Date(JSON.parse(localStorage.getItem("date")));
    let countDownDate = countDown.getTime();
    let x = setInterval(function () {
        let now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = (minutes > 9 ? "" : "0") + minutes + ":" + (seconds > 9 ? "" : "0") + seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Время истекло!";
        }
    }, 100);

    for (let input of document.querySelectorAll("input")) {
        input.onfocus = (e) => {
            const id = e.target.id;
            const label = document.getElementById(id + "-label");
            label.classList.remove("hidden");
        }
        input.onblur = (e) => {
            const id = e.target.id;
            const label = document.getElementById(id + "-label");
            label.classList.add("hidden");
        }
    }
}