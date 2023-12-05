# AWS 세팅
## IAM 사용자 생성 / 액세스 키 발급
서버에서 AWS 기능을 이용하고 싶으면 코드짤 때 Access key가 하나 필요
발급하려면 IAM 사용자 생성
IAM 사용자: 내 AWS 계정(루트 권한)을 여러 사람이 사용할 수도 있기 때문에 필요한 권한만 넣은 하위 계정을 만드는 것
사용자 이름 작성 후 직접 정책 연결(AmazonS3FullAccess) -> 사용자 정보에서 액세스 키 만들기 -> 로컬 코드
그럼 액세스 키와 비밀키 2개를 발급해주는데 코딩할 때 사용하게 안전한 곳에 보관 
이거 털리면 다른 사람이 내 계정으로 AWS 이용 가능(요금 폭탄)
그리고 ARN도 있는데 이것도 필요하니까 같이 보관

## S3 버킷 만들기
버킷(바구니): 하나의 저장공간
버킷 이름 작성 후 모든 퍼블릭 액세스 차단 해제하고 버킷 만들기
(테스트를 위해) 퍼블릭 액세스 가능=모든 인터넷 사용자가 액세스할 수 있음을 의미
버킷 정보에서 권한탭에 들어가 버킷 접근 권한 설정(어떤 사람이 업로드 할 수 있고 읽을 수 있는지)

- 권한 설정 2가지 방법 
1) 버킷 정책(권장)
2) ACL(예전 방식)

아래 정책 복붙
"Sid": "1"번 정책
아무나("Principal": "*") 버킷의 데이터를 읽을 수 있음("Action": "s3:GetObject")

Sid: 2번 정책
쓰기 및 삭제를 특정 사용자만("AWS": "나의 ARN") 할 수 있음

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::만든버킷명/*"
    },
    {
      "Sid": "2",
      "Effect": "Allow",
      "Principal": {
        "AWS": "나의 ARN"
      },
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::만든버킷명/*"
    }
  ]
}

- CORS(Cross-Origin Resource Sharing) 설정
어떤 도메인(사이트)에서 버킷 안의 파일들을 읽기, 쓰기, 삭제할 수 있는지 설정하는 부분
실제 운영 서비스면 다른 도메인에서 데이터 접근을 못 하게 만들기 위해
AllowedOrigins 안에 실제 서비스 도메인.com 넣는게 좋음! 우린 개발중이니 * 넣음

아래 복붙
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "PUT",
      "POST"
    ],
    "AllowedOrigins": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ]
  }
]