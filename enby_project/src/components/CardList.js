import React, { useEffect } from 'react';

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import Card from './Card';
import {actionsCreators as postActions} from '../redux/modules/post'

const CardList =(props)=>{
    const dispatch = useDispatch();
    const post_list = useSelector((store) => store.post.list)
    // const post_list = useSelector((store)=> store.post.detail_list)
    console.log(post_list);
    useEffect(()=>{
        dispatch(postActions.getPostMainDB())
    }, [dispatch])

    return (
      <ListBody>
        <PostList>
            {post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            })}
          
        </PostList>
      </ListBody>
    );
}
const ListBody = styled.div`
    text-align : center;
    max-width: 1920px;
    // max-width: 1200px;
    margin: 100px;
    // margin: 0 auto;
    padding: 0;
`
const PostList = styled.ul`

padding: 0;
margin: 0;
width: 100%;
`

export default CardList;