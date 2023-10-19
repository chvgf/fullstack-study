import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
  {
    id: 1,
    message: "안녕하세요, 오늘 일정을 알려드립니다.",
  },
  {
    id: 2,
    message: "점심식사 시간입니다.",
  },
  {
    id: 3,
    message: "이제 곧 미팅이 시작됩니다.",
  },
];

let timer;

class NotificationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [], // notifications라는 state를 만들고 초기값은 빈 배열
    };
  }

  // 컴포넌트가 생성될 때 호출되는 메소드
  componentDidMount() {
    const { notifications } = this.state; // ES6차 구조 분해 할당
    timer = setInterval(() => {
      if (notifications.length < reservedNotifications.length) { // 3개 보다 작은 경우에만
        const index = notifications.length;
        notifications.push(reservedNotifications[index]); // notifications라는 새로운 배열에 추가
        this.setState({ // state를 직접 변경하는 것이 아닌 setState() 함수를 사용하여야 재렌더링 됨
          // notifications: notifications,
          notifications, // ES6차 문법
        });
      } else {
        // 실습2: 언마운트 시키기 위해 작성
        // this.setState({
        //   notifications: [],
        // });

        clearInterval(timer);
      }
    }, 1000); // 1초에 한번씩 state가 변경되므로 1초마다 화면이 재렌더링 됨(화면이 바뀜)
  }

  render() {
    return (
      <div>
        {this.state.notifications.map((notification) => {
          return (
            <Notification
              key={notification.id}
              id={notification.id}
              message={notification.message}
            />
          );
        })}
      </div>
    );
  }
}

export default NotificationList;