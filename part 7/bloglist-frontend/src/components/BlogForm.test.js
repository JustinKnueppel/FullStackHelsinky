import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("Blogform sends correct information to create blog", () => {
    const addBlog = jest.fn();
    const component = render(<BlogForm addBlog={addBlog} />);
    const title = component.container.querySelector("input[name='title']");
    fireEvent.change(title, {
      target: { value: "Test title" },
    });
    const author = component.container.querySelector("input[name='author']");
    fireEvent.change(author, {
      target: { value: "Test author" },
    });
    const url = component.container.querySelector("input[name='url']");
    fireEvent.change(url, {
      target: { value: "Test url" },
    });
    const likes = component.container.querySelector("input[name='likes']");
    fireEvent.change(likes, {
      target: { value: "1" },
    });

    fireEvent.submit(component.container.querySelector("form"));

    const blog = addBlog.mock.calls[0][0];
    expect(blog.title).toEqual("Test title");
    expect(blog.author).toEqual("Test author");
    expect(blog.url).toEqual("Test url");
    expect(blog.likes).toEqual(1);
  });
});
