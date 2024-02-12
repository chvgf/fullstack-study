import { useEffect } from "react";

function App() {
  const nums = [1, 2, 2, 5, 3, 4, 5, 6, 7];
  console.log(nums.indexOf(7));

  const unicnum = nums.filter((el, index) => {
    return nums.indexOf(el) === index;
  });
  // 인덱스 오브 활용 하따마 다 까무뿟노 코테 보겠나 이래가~

  useEffect(() => {
    console.log(nums);
    console.log(unicnum);
  }, []);

  return <div></div>;
}

export default App;
