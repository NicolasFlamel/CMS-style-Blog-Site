const addComment = async event => {
    event.preventDefault();
    const url = '/api/comments'
    // get blogId stored in html
    const blogId = document.querySelector('.blog').dataset.id;
    const message = event.target.querySelector('#comment-message').value.trim();

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ message, blogId }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const updateComment = async event => {
    event.preventDefault();
    const url = '/api/comments'
}

const deleteComment = async event => {
    event.preventDefault();

}

document.querySelector('#comment-post-form').addEventListener('submit', addComment);

document.querySelectorAll('.blog-edit-form')
    .forEach(blog => blog.addEventListener('submit', updateComment));

document.querySelectorAll('.blog-edit-form button')
    .forEach(blog => blog.addEventListener('click', deleteComment));