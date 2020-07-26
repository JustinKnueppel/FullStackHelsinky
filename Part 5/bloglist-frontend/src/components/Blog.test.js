import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  let likeBlog;
  let deleteBlog;

  beforeEach(() => {
    const blog = {
      title: "Test title",
      author: "Test author",
      url: "Test url",
      likes: 0,
    };

    likeBlog = jest.fn();
    deleteBlog = jest.fn();
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    );
  });

  test("Only title shows by default", () => {
    expect(component.container).toHaveTextContent("Test title");
    expect(component.container).not.toHaveTextContent("Test Author");
    expect(component.container).not.toHaveTextContent("Test url");
  });

  test("Url and likes are shown when details expanded", () => {
    fireEvent.click(component.getByText("details"));
    const likesElem = component.getByText("0");
    expect(likesElem).toBeDefined();
    const urlElem = component.getByText("Test url");
    expect(urlElem).toBeDefined();
  });

  test("Like function is fired when like button clicked", () => {
    fireEvent.click(component.getByText("Like"));
    fireEvent.click(component.getByText("Like"));

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
