let userName = document.querySelector('.userName');
let button = document.querySelector('.add');
let commentsWrapper = document.querySelector('.wrapper_comments');
let comments = document.querySelector('.comments');
let date = document.querySelector('.date');

let commentsList = [];


if (localStorage.getItem('commentsWrapper')) {
    todoList = JSON.parse(localStorage.getItem('commentsWrapper'));
    displayComments();
}

let commentId = 0;

function addBlockComments() {
    if (!userName.value) return;
    let newWrapper = {
        commentsWrapper: userName.value,
        comments: comments.value,
        date: date.value,
        id: commentId

    };
    commentId++;
    commentsList.push(newWrapper);
    displayComments();

    localStorage.setItem('commentsWrapper', JSON.stringify(commentsList));
}


button.addEventListener('click', addBlockComments);

function currentDate() {
    const previousDate = new Date().toLocaleString('ru',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
    );
    return previousDate

}



function displayComments() {
    let displayMessage = '';
    if (commentsList.length === 0) commentsWrapper.innerHTML = '';
    commentsList.forEach(function (item, i) {
        let currentDay = item.date || currentDate()
        displayMessage += `
        <li>
        <label for='item_${i}'>${item.commentsWrapper}</lable>
        <textarea class="comments">${item.comments}</textarea>
        <p>${currentDay}</p>
        <a href="#" class="deleteComments"  ><i class="fa fa-shopping-cart" aria-hidden="true" onclick="deleteComments(${item.id})" data-specialId=${item.id} ></i></a>
        <a href="#" class="likeComments" ><i class="fa fa-heart" aria-hidden="true" id="mode"class="light" onclick="toggleLike(event)" ></i></a> 
        </li>
        `;

        commentsWrapper.innerHTML = displayMessage;
    });

}


document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        addBlockComments();
    }
    return
});




function deleteComments(id) {
    commentsList = commentsList.filter((item) => {
        return !(item.id === Number(id))

    })
    displayComments();
}


function toggleLike(event) {

    event.target.classList.toggle("red");
    localStorage.setItem('commentsWrapper', JSON.stringify(commentsList));
}