import "../styles/page.css";
import "../styles/home.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostDetails } from "../reducers/postReducer";
import { fetchPartnerPosts } from "../reducers/postReducer";
import DOMPurify from "dompurify";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, posts: partnerPosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetails(id));
      dispatch(fetchPartnerPosts(id));
    }
  }, [dispatch, id]);

  console.log(partnerPosts);

  return (
    <>
      <div className="post-detail">
        <div className="post-container">
          <span className="post-category">{post?.category}</span>

          <h1 className="post-title">{post?.title}</h1>

          <span className="post-date">{post?.date}</span>

          <div className="post-image">
            <img src={post?.imageUrl?.url} alt={post?.title} />
          </div>

          <div className="post-content">
            <article
              className="quill-render"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.content || ""),
              }}
            />
          </div>
        </div>
      </div>
      <div className="read-also homePage">
        <h3>Partner Posts:</h3>

        <div className="read-also-grid">
          {partnerPosts?.map((post) => (
            <div className="read-also-card" key={post._id}>
              <div className="read-also-image">
                <img src={post?.imageUrl?.url} alt={post?.title} />
              </div>

              <div className="read-also-content">
                <p>{post?.title}</p>
                <span>{post?.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
