import { useRef } from "react";

function FileInput() {
  const fileInput = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fileInput.current.files);
    alert(`선택된 파일: ${ fileInput.current.files[0].name }`)
  };

  return(
    <form onSubmit={handleSubmit}>
    <label>
      파일 업로드:
      <input type="file" ref={fileInput} />
      {/* 값을 설정 할 수 없고 사용자가 첨부한 파일의 정보만 읽어올 수 있기 때문에 비제어 컴포넌트가 됨 */}
    </label>
    <button type="submit">제출</button>
  </form>

  );
}

export default FileInput;