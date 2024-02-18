import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const FormPost = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "", bod: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "", body: "", bod: "" });
  };

  return (
    <form>
      {/*Управляемый компонент*/}
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      {/*Управляемый компонент*/}
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описанеи поста"
      />
      <MyInput
        value={post.bod}
        onChange={(e) => setPost({ ...post, bod: e.target.value })}
        type="text"
        placeholder="Комментарии"
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default FormPost;
