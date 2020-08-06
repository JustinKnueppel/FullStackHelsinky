import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, resetInnfo] = useField("text");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.displayNotification({ type: "success", text: `Added ${content.value}` });
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
          <button onClick={resetContent}>x</button>
        </div>
        <div>
          author
          <input name="author" {...author} />
          <button onClick={resetAuthor}>x</button>
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
          <button onClick={resetInnfo}>x</button>
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
