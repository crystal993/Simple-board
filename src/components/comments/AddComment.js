import React, { useState } from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { __addComment } from "../../redux/modules/commentsSlice";
import Button from '../common/Button';



const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { 
    register,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm();
  const [comment, setComment] = useState({
    username: "",
    content: "",
  });

  const onAddCommentButtonHandler = (data) => {

    dispatch(__addComment({
      todoId: id,
      username: data.username,
      content: data.content
    }));
    setComment({
      username: "",
      content: "",
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <WrapperForm onSubmit={handleSubmit(onAddCommentButtonHandler)}>
      <TextField
        required
        id="outlined-required"
        label="작성자이름"

        placeholder="작성자이름 (5자 이내)"
        aria-invalid={!isDirty ? undefined : errors.username ? "true" : "false"}
        {...register("username", {
          required: "작성자는 필수 입력사항입니다.",
          maxLength: {
            value: 5,
            message: "5자 이내여야합니다.",
          },
        })}
        value={comment.username}
        type='text'
        name='username'
        onChange={onChangeInputHandler}
      />
      {errors.username && <small role="alert">{errors.username.message}</small>}

      <TextField
        required
        id="outlined-required"
        label="댓글내용"

        placeholder='댓글내용 (100자 이내)'
        aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"}
        {...register("content", {
          required: "내용은 필수 입력사항입니다.",
          maxLength: {
            value: 100,
            message: "100자 이내로  작성해주세요.",
          },
        })}
        value={comment.content}
        name='content'
        type='text'
        onChange={onChangeInputHandler}
      />
      {errors.content && <small role="alert">{errors.content.message}</small>}
      <Button type='submit'>
        추가하기
      </Button>
    </WrapperForm>
  );
};

export default AddCommentForm;

const WrapperForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid gray;
  margin: 0 auto;
  padding: 10px 10px;
  margin-top: 1rem;
  width: 700px;
  
  .title {
    display: block;
  }
`;
