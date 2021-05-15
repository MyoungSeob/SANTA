// 리뷰 등록 페이지
// 등록 된 글 id와 맞는 글이 그대로 불러와지도록(수정모드 처럼)
import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionsCreators as imgActions } from "../redux/modules/image";
import { actionsCreators as postActions } from "../redux/modules/post";
import jwt_decode from "jwt-decode";
import { history } from "../redux/configStore";
import upload from '../shared/image/upload.png'

const ReviewBoardWrite = (props) => {
  // 수정모드
  const token = localStorage.getItem('token')
  const decode = jwt_decode(token)
  const my_name = decode.nickname

  const review_list = useSelector((store) => store.post.review_list);
  console.log(props)
  const id = Number(props.match.params.id);
  
  const is_edit = my_name ? true : false;



  let review_img = useSelector(
    (store) => store.post.review_detail.review_imgUrl
  );
  let _review = is_edit
    ? review_list.find((p) => p.review_id === id)
    : "";
  const board_id = _review ? _review.board_id : Number(props.match.params.id);
  console.log(_review);
  const [title, setTitle] = useState(_review ? _review.title : "");
  const [contents, setContents] = useState(_review ? _review.contents : "");
  const [reviewImg, setImage] = useState(_review ? _review.review_imgUrl : "");
    console.log(reviewImg)
  // 이미지 추가 미리보기`
  const preview = useSelector((state) => state.image.preview);
  const fileInput = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (_review) {
    //   const reader = new FileReader();
    //   const file = _review ? _review.review_imgUrl : fileInput.current.files[0];
    //   console.log(file);
    //   if (!file) {
    //     return;
    //   }

    //   reader.readAsDataURL(file);
    //   // 파일 읽기가 끝났을때의 이벤트 받아옴
    //   reader.onloadend = () => {
    //     // setPreviewimg(file)
    //     setImage(file);
    //     console.log(reader.result);
    //     dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
    //   };
    // }
  }, [preview]);

  // 이미지 추가 미리보기
  const selectFile = () => {
      const reader = new FileReader();
      const file = fileInput.current.files[0];
      console.log(file);
      if (!file) {
          return;
      }
      
      reader.readAsDataURL(file);
      // 파일 읽기가 끝났을때의 이벤트 받아옴
      reader.onloadend = () => {
        // setPreviewimg(file)
        setImage(file);
        console.log(reader.result);
        dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
      };
  };
  const reviewEditPreview=()=>{
    if(reviewImg === _review.review_imgUrl){
      return reviewImg
    }else{
      return preview
    }
  }
  const editReviewImage=()=>{
    if(reviewImg === _review.review_imgUrl){
      return null
    }else{
      return reviewImg
    }
  }
  const addReview = () => {
    dispatch(postActions.addReviewDB(board_id, title, contents, reviewImg));
  };
  const editReview = () => {
    dispatch(postActions.editReviewDB(id, board_id, title, contents, editReviewImage()));
  };
  const is_upload =()=>{
    if( reviewImg === ""){
      return (
        <Label for="reviewImage">
              <span>
                <LabelBox>
                  <LabelImage src={upload} />
                  <Label_ for="reviewImage">이미지 불러오기</Label_>
                </LabelBox>
              </span>
            </Label>
      )
    }else{
      return (
        _review ? (<>
          <LabelUpload for="reviewImage" />
          <PreviewImage src={reviewEditPreview()}/>
        </>) : (
          <>
          <LabelUpload for="reviewImage" />
          <PreviewImage src={preview}/>
        </>
        )
        
      );
    }
  }
  return (
    <Container>
      <Test>
        <TitleBox>
          <InputGrid>
            <InputBox
              label="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="제목을 입력하세요"
            />

            {_review ? (
              <PostButton onClick={editReview}>수정하기</PostButton>
            ) : (
              <PostButton onClick={addReview}>작성하기</PostButton>
            )}
          </InputGrid>
        </TitleBox>

        <ContentsBox>
          <ImageBox>
            {is_upload()}
            <Image
              onChange={selectFile}
              placeholder="사진을 추가해주세요"
              ref={fileInput}
              id="reviewImage"
              type="file"
              src={_review ? reviewEditPreview : preview}
            />
          </ImageBox>
          <TextBox>
            <TextBox2>
              <ContentsH>About</ContentsH>
            </TextBox2>
            <Contents
              label="내용"
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
              placeholder="내용을 입력하세요"
            />
          </TextBox>
        </ContentsBox>
      </Test>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  width: 100%;
`;
const Test = styled.div`
  width : 100%;
`;
const ImageBox = styled.div`
  width: 718px;
  margin : auto 61px 170px auto;
  display : block;
`;
const Image = styled.input`
  display : none;
`;
const Label = styled.label`
  display : inline-block;
  width: 513px;
  height: 513px;
  background: #f8f8f8;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  `
const ImageUpload = styled.input`
display : none;
width: 513px;
height: 513px;
background: #f8f8f8;
background-image: url(${(props) => props.src});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
`
const LabelUpload = styled.label`
position : absolute;
width: 513px;
height: 513px;
`
const PreviewImage = styled.img`
  width  : 513px;
  height : 513px;
`
const Label_ = styled.label`
  background-color : #168ed9;
  width : 167px;
  height : 30px;
  color : #ffffff;
  text-align : center;
  border-radius : 20px;
  margin-top : 20px;
  padding-top : 10px;
  cursor : pointer;
`
const LabelBox = styled.div`
  display : flex;
  flex-direction : column;
  margin : 210px 173px;
`
const LabelImage = styled.img`
  width : 24px;
  height : 34px;
  margin : auto;
`
const TitleBox = styled.div`
  width: 100%;
  height : 233px;
  margin: auto;
  background-color : #F8F8F8;
  display : flex;
`;
const InputGrid = styled.div`
  width : 1200px;
  margin : auto;
  display : flex;
`
const InputBox = styled.input`
  display: flex;
  flex-direction: row;
  padding: 6px 20px;
  width: 995px;
  height: 39px;
  margin-right : 61px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
`;
const TextBox = styled.div`
  width : 615px;
  height : 511px;
  float : right;

`
const ContentsBox = styled.div`
  display: flex;
  width: 1200px;
  margin : 60px auto auto auto;
`;

const TextBox2 = styled.div`
  width: 100%;
  color: #000000;
  margin: auto;
`;
const ContentsH = styled.h2`
  font-family: Seravek;
  font-style: italic;
  font-weight: bold;
  font-size: 28px;
  margin: auto;
`;

const Contents = styled.textarea`
  display: block;
  padding: 11px 20px;

  width: 615px;
  height: 437px;
  margin-top: 43px;

  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  resize : none;
`;

const PostButton = styled.button`
  background: #168ed9;
  border-radius: 20px;
  margin : auto;
  color : #ffffff;
  font-family : notosans_regular;
  font-size : 18px;

  width: 167px;
  height: 40px;

  cursor: pointer;
  border: 0;
`;



export default ReviewBoardWrite;
