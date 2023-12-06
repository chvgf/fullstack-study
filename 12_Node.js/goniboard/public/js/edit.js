document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.id.value;
  const title = e.target.title.value;
  const content = e.target.content.value;
  if(!title) {
    return alert('제목을 입력하세요');
  } 
  try {
    const result = await axios.patch(`/post/${id}`, { title, content });
    console.log(result);
    if (!result.data.flag) {
      return alert(result.data.message);
    }
    location.href = '/post'
  } catch (err) {
    console.error(err);
  }
});