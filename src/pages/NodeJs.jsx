import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsByCategory } from "../reducers/postReducer";
import "../styles/page.css";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NodeJs = () => {
  const dispatch = useDispatch();

  const posts =
    useSelector((state) => state.post.postsByCategory?.NodeJs?.data) || [];

  const pagination =
    useSelector((state) => state.post.postsByCategory?.NodeJs?.pagination) ||
    {};

  const count =
    useSelector((state) => state.post.postsByCategory?.NodeJs?.count) || 0;

  const [page, setPage] = useState(1);
  const category = "NodeJs";

  useEffect(() => {
    dispatch(fetchAllPostsByCategory({ page, category }));
  }, [dispatch, page]);

  const onPageChange = (newPage) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  return (
    <section className="business-page">
      {/* Header */}
      <h1 className="page-title">NodeJs Posts ({count})</h1>
      <div className="divider"></div>

      {/* Grid */}
      <div className="business-grid">
        {posts.map((post) => (
          <Link to={`/post-details/${post._id}`} key={post._id}>
            <article className="business-card" key={post._id}>
              <div className="card-content">
                <h2>{post.title}</h2>
              </div>

              <img src={post.imageUrl.url} alt={post.title} />
              <div className="card-content">
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
              </div>
            </article>
          </Link>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => onPageChange((pagination.currentPage || 1) - 1)}
          >
            ‹
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                className={
                  pagination.currentPage === pageNumber ? "active" : ""
                }
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => onPageChange((pagination.currentPage || 1) + 1)}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default NodeJs;
