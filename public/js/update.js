  const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const contents = document.querySelector('#blog-content').value.trim();
    const id = document.querySelector('#blog-id').value.trim(); // Get the blog ID
  
    if (title && contents) {
      const response = await fetch(`/api/blogs/${id}`, { // Include the ID in the URL
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to update blog');
      }
    }
  };
  
  document
    .querySelector('.update-form')
    .addEventListener('submit', updateFormHandler);