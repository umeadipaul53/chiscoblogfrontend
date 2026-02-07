import React from "react";
import "../../../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllPostsByCategory } from "../../../reducers/postReducer";
import { useState, useEffect } from "react";

const Hero = () => {
  const dispatch = useDispatch();
  const posts =
    useSelector((state) => state.post.postsByCategory?.NodeJs?.data) || [];
  const [page, setPage] = useState(1);
  const category = "NodeJs";

  const limit = 10;

  useEffect(() => {
    dispatch(fetchAllPostsByCategory({ page, category, limit }));
  }, [dispatch, page, category]);

  if (!posts || posts.length < 2) return null;

  const bigPost = posts[0];
  const smallPost = posts[1];
  const remaining = posts.slice(2);

  const column2 = remaining.slice(0, 4);
  const column3 = remaining.slice(4, 8);

  return (
    <section className="hero-grid homePage">
      {/* Column 1 */}
      <div className="col col-1">
        {/* Big post */}
        <Link to={`/post-details/${bigPost._id}`} key={bigPost._id}>
          <article className="post big">
            <img src={bigPost.imageUrl.url} alt={bigPost.title} />
            <h2>{bigPost.title}</h2>
          </article>
        </Link>

        {/* Small post */}
        <Link to={`/post-details/${smallPost._id}`} key={smallPost._id}>
          <article className="post side">
            <img src={smallPost.imageUrl.url} alt={smallPost.title} />
            <p>{smallPost.title}</p>
          </article>
        </Link>
      </div>

      {/* Column 2 */}
      <div className="col col-2">
        {column2.map((post) => (
          <Link to={`/post-details/${post._id}`} key={post._id}>
            <article className="post side" key={post._id}>
              <img src={post.imageUrl.url} alt={post.title} />
              <p>{post.title}</p>
            </article>
          </Link>
        ))}
      </div>

      {/* Column 3 */}
      <div className="col col-3">
        {column3.map((post) => (
          <Link to={`/post-details/${post._id}`} key={post._id}>
            <article className="post side" key={post._id}>
              <img src={post.imageUrl.url} alt={post.title} />
              <p>{post.title}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;
