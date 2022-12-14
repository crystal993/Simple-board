import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

import Button from '../common/Button';
import {
  __deleteComment,
  __updateComment,
} from "../../redux/modules/commentsSlice";
import {
  clearComment,
  __getComment,
} from "../../redux/modules/commentSlice";
import {Wrapper} from "../common/Wrapper";


const Comment = ({ comment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const { content } = useSelector((state) => state.comment.data);


  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        username: comment.username,
        todo_id: id,
      })
    );
    setIsEdit(false);
  };


  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getComment(comment.id));
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearComment());
  };

  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);


  return (
    <div>
      {isEdit ? (
        <Wrapper>
          <p>작성자 : {comment.username}</p>
          <TextField id="outlined-basic" label="내용" variant="outlined" 
           type="text"
            value={updatedComment}
            onChange={(event) => {
              setUpdatedComment(event.target.value);
            }}
          
          />
          <ButtonSet>
            <Button
              onClick={onCancelButtonHandler}
              style={{
                marginRight: "10px",
              
            }}  
            >
              <p>취소</p>
            </Button>
            <Button
              onClick={onUpdateButtonHandler}
            >
              <p >저장</p>
            </Button>
          </ButtonSet>
        </Wrapper>

      ) : (
        <>
          <Wrapper>
            <p>작성자 : {comment.username}</p>
            <p>내용 : {comment.content}</p>

            <ButtonSet>
              <EditIcon
                onClick={onChangeEditButtonHandler}
              />
              <DeleteIcon
                onClick={onDeleteButtonHandler}
              />
            </ButtonSet>

          </Wrapper>
        </>
      )}
    </div>
  );
}

export default Comment;


const ButtonSet = styled.div`
  float: right;
`;
