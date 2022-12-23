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
    const { id } = event.target.dataset;
    const url = '/api/comments/' + id;
    const message = event.target.querySelector('#comment-message-' + id).value.trim();

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok)
        document.location.reload();
    else
        alert(response);
}

const deleteComment = async event => {
    event.preventDefault();
    const { id } = event.target.dataset;
    const url = '/api/comments/' + id;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok)
        document.location.reload();
    else
        alert(response);
}

document.querySelector('#comment-post-form').addEventListener('submit', addComment);

document.querySelectorAll('#comment-edit-form')
    .forEach(blog => blog.addEventListener('submit', updateComment));

document.querySelectorAll('#comment-edit-form button')
    .forEach(blog => blog.addEventListener('click', deleteComment));