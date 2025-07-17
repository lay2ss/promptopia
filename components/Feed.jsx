"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const feed = () => {

  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, [searchText]);

  useEffect(() => {
    if (!searchText) return;

    const delayDebounce = setTimeout(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/search?q=${searchText}`);
        const data = await response.json();
        setPosts(data);
      };
      fetchPosts();
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const PromptCardList = ({data, handleTagClick}) => {
    return (
      <div className="mt-16 prompt_layout">
        { data.map((post) => (
          <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
        ))}
      </div>
    )
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" 
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer font-figtree"
        />
      </form>

      <PromptCardList
      data={posts}
      handleTagClick={(tag) => {
        const fetchPosts = async () => {
        setSearchText(tag);
        const response = await fetch(`/api/search?q=${tag}`);
        const data = await response.json();
        setPosts(data);
      };
      fetchPosts();
      }}
      />

    </section>
  )
}

export default feed