// const newCommentHandler = async (event) => {
//   event.preventDefault();
// console.log('button clicked to add comments')
//   const userid= document.querySelector('#userid').value.trim();
//   const blogid = document.querySelector('#blogid').value.trim();
//   const comments = document.querySelector('#comments').value.trim();

//   console.log(userid + " userid");
//   console.log(blogid + " blogid");
//   console.log(comments + " comments");


//   if (userid && blogid && comments) {
//     const response = await fetch(`/api/comments`, {
//       method: 'POST',
//       body: JSON.stringify({ comments, userid, blogid }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to create blog');
//     }
//   }
// };



// document
//   .querySelector('.new-comment')
//   .addEventListener('submit', newCommentHandler);

console.log("comment.js loaded");



const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("Form submitted");

  const userid= document.querySelector('#userid').value.trim();
  const blogid = document.querySelector('#blogid').value.trim();
  const comments = document.querySelector('#comments').value.trim();

  console.log(userid + " userid userid userid kim said this isthe userid");
  console.log(blogid + " blogid");
  console.log(comments + " comments");

  if (userid && blogid && comments) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comments, userid, blogid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document.querySelector('.new-comment').addEventListener('submit', newCommentHandler);