document.getElementById('write-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const content = e.target.content.value;
      const img = e.target.img.files[0];
      const formData = new FormData();
      console.log(img);

      formData.append('img', img);
      formData.append('title', title);
      formData.append('content', content);

      try {
        if(!title) {
          return alert('제목을 입력하세요');
        } 
        const result = await axios.post('/post/write', formData);
        console.log(result);
        if (!result.data.flag) {
          return alert(result.data.message);
        }
        location.href = '/post'
      } catch (err) {
        console.error(err);
      }
    });