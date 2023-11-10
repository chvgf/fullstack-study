import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PreiviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Preiview = styled.div`
  width: 200px;
  height: 200px;
  padding: 4px;
  margin-right: 8px;
  border-radius: 6px;
  border: 1px solid #eaeaea;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function ImagePreviewEx() {
  const [files, setFiles] = useState([]);
  const fileInput = useRef(null);

  const handleFileChange = () => {
    const acceptedFiles = Array.from(fileInput.current.files);

    // URL.createObjectURL(): 이미지를 브라우저 메모리에 저장하여 이미지 URL을 생성하는 방식
    const previewImageFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(previewImageFiles);
  };

  useEffect(() => {
    // 동일한 파일 객체를 이용하여 URL을 생성한다고 해도 새로운 URL을 생성
    // 메모리 누수를 방지하려면 메모리에서 해제 필요(언마운트 시 실행)
    // (물론 브라우저를 종료하면 생성한 URL도 함께 메모리에서 해제됨)
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <label htmlFor="testImage">파일 첨부: </label>
      <input type="file" id="testImage" accept="image/*" ref={fileInput} onChange={handleFileChange} multiple />
      <PreiviewContainer>
        {files.map(file => 
          <Preiview key={file.name}>
            <img 
              src={file.preview} 
              alt="preview" 
              // 이미지 로드 후 데이터 URI 취소
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          </Preiview>
        )}
      </PreiviewContainer>
    </>
  );
}

export default ImagePreviewEx;