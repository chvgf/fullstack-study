document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const comment = e.target.comment.value;


  try {
    if(!comment) {
      return alert('댓글을 입력하세요');
    } 
    const result = await axios.post('/post/detail/:id/comment', { comment });
    console.log(result);
    if (!result.data.flag) {
      return alert(result.data.message);
    }
    location.href = `/post/detail/:id`
  } catch (err) {
    console.error(err);
  }
});