const postBlog = async event => {
    event.preventDefault();
    // remove listener
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

const updateBlog = async event => {
    event.preventDefault();
    const { id } = event.target.dataset;
    const url = '/api/blogs/' + id;
    const title = event.target.querySelector('#title-' + id).value.trim();
    const body = event.target.querySelector('#message-' + id).value.trim();

    // left off here
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok)
        document.location.replace();
    else
        alert(response)
}

const deleteBlog = async event => {
    event.preventDefault();
    const { id } = event.target.dataset
    const url = '/api/blogs/' + id;

    console.log('ping1');
    const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log('ping');

    if (response.ok)
        document.location.reload();
    else
        alert(response)
}

document.querySelector('#blog-post-form').addEventListener('submit', postBlog);

document.querySelectorAll('.blog-edit-form')
    .forEach(blog => blog.addEventListener('submit', updateBlog));

document.querySelectorAll('.blog-edit-form button')
    .forEach(blog => blog.addEventListener('click', deleteBlog));