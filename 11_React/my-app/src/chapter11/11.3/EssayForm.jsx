import { useState } from "react";

function EssayForm() {
  const [value, setValue] = useState('가장 좋아하는 것에 대한 에세이를 작성하세요.');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    alert('제출된 에세이: ' + value )
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        에세이:
        <textarea value={value} onChange={handleChange} />
        {/* HTML DOM 요소에서는 테스트를 자식으로 정의했지만 React에서는 value 속성을 사용 */}
      </label>
      <button type="submit">제출</button>
    </form>
  );
}

export default EssayForm;