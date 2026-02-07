import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts, deletePost } from "../reducers/postReducer";
import "../styles/page.css";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyPosts = () => {
  const dispatch = useDispatch();
  const { posts, pagination, count } = useSelector((state) => state.post);

  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchMyPosts({ page }));
  }, [dispatch, page]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Delete Post",
      text: "Are you sure you want to delete this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const res = await dispatch(deletePost(id)).unwrap();
      setMessage(res?.message || "Post deleted successfully!");

      // 🔁 refetch current page after delete
      dispatch(fetchMyPosts({ page }));
    } catch (err) {
      setMessage(err?.message || "Could not delete Post successfully!");
    }
  };

  return (
    <section className="business-page">
      <h1 className="page-title">My Posts ({count})</h1>
      <div className="divider"></div>

      {message && <div className="error-msg">{message}</div>}

      <div className="business-grid">
        {posts.map((post) => (
          <article className="business-card" key={post._id}>
            <Link to={`/post-details/${post._id}`} className="card-link">
              <div className="card-content">
                <h2>{post.title}</h2>
                <span className="date">{post.date}</span>
              </div>
              <img src={post?.imageUrl?.url} alt={post.title} />
            </Link>

            <div className="card-actions">
              <Link to={`/edit-post/${post._id}`} className="btn btn-edit">
                Edit
              </Link>

              <button
                className="btn btn-delete"
                onClick={(e) => handleDelete(e, post._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ‹
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default MyPosts;
