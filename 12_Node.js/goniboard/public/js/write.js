document.getElementById('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const content = e.target.content.value;
      try {
        if(!title) {
          return alert('제목을 입력하세요');
        } 
        const result = await axios.post('/post/write', { title, content });
        console.log(result);
        if (!result.data.flag) {
          return alert(result.data.message);
        }
        location.href = '/post'
      } catch (err) {
        console.error(err);
      }
    });