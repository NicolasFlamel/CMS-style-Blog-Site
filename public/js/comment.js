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

document.querySelector('#comment-post-form').addEventListener('submit', addComment)