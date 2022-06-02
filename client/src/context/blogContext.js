import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

//context
const BlogContext = createContext();

//context provider
export function BlogContextProvider({ children }) {
  const [posts, setPosts] = useState([{}]);
  const [blogs, setBlogs] = useState([{}]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/blogs/getAll");
        const res1 = await axios.get("/userPosts/getAll");
        setBlogs(res.data);
        setPosts(res1.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        posts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
