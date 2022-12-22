const postBlog = async event => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#message').value.trim();

    const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#blog-post-form').addEventListener('submit', postBlog)