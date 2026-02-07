import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsByCategory } from "../../../reducers/postReducer";
import "../../../styles/home.css";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NextJsPosts = () => {
  const dispatch = useDispatch();
  const posts =
    useSelector((state) => state.post.postsByCategory?.NextJs?.data) || [];
  const [page, setPage] = useState(1);
  const category = "NextJs";

  const limit = 6;

  useEffect(() => {
    dispatch(fetchAllPostsByCategory({ page, category, limit }));
  }, [dispatch, page, category]);

  return (
    <section className="entertainment homePage">
      <div className="section-header">
        <h3>NextJs POSTS</h3>
        <div className="divider"></div>
      </div>

      <div className="entertainment-grid">
        {posts.map((post) => (
          <Link to={`/post-details/${post._id}`} key={post._id}>
            <article className="ent-card" key={post._id}>
              <div className="image-wrapper">
                <img src={post.imageUrl.url} alt={post.title} />
                <span className="badge">C++ post</span>
              </div>

              <h2 className="title">{post.title}</h2>
              {/* Meta info */}
              <div className="post-meta">
                <span className="author">
                  By {post.author?.username || "Admin"}
                </span>
                <span className="dot">•</span>
                <span className="time">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NextJsPosts;
