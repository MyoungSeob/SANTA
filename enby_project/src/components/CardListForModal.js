// 모달 리뷰 카드 리스트
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ReviewCard from './ReviewCard';
import {actionsCreators as postActions} from '../redux/modules/post'
import CardForModal from './CardForModal';

import {actionsCreators as userActions} from '../redux/modules/user'
import jwt_decode from 'jwt-decode';

const ReviewCardList =(props)=>{
    // 참여했던 모임
    const dispatch = useDispatch();
    const wroteReviewList = useSelector((store) => store.post.needWrite_list)
    
    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            const token = localStorage.getItem("token");
            const decode = jwt_decode(token);
            const name = decode.nickname;
            dispatch(userActions.getMyProfileDB(name));
            dispatch(postActions.getNeedWriteRiviewAPI());
        }
        
      }, []);
       

    return(
        <ListBody>
            <PostList>
                {wroteReviewList.map((p)=>{
                return <CardForModal {...p} key={p.id}/>})}          
            </PostList>
        </ListBody>
    );
}
const ListBody = styled.div`
padding: 5px;
@media (min-width: 600px) and (max-width: 1170px) {
    margin: auto;
}
;`
const PostList = styled.div`
display: flex;
justify-content : space-around;
@media (min-width: 600px) and (max-width: 1170px) {
    justify-content: 0;
    // margin-left: 140px;
    // margin-top: 30px;
    }
`;

export default ReviewCardList