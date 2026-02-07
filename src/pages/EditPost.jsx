import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetails, editPost } from "../reducers/postReducer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CATEGORIES = ["NodeJs", "React", "Python", "VueJs", "NextJs"];

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { post, loading, error } = useSelector((state) => state.post);

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    image: null,
  });

  /* Fetch post */
  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [dispatch, id]);

  /* Populate form when post loads */
  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        subtitle: post.subtitle || "",
        content: post.content || "",
        category: post.category || "",
        image: null, // will be null unless user uploads new
      });

      if (post?.imageUrl?.url) {
        setPreview(post.imageUrl.url);
      }
    }
  }, [post]);

  // for inputs & select
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // for ReactQuill
  const handleContentChange = (value) => {
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: null }));
    }

    setForm((prev) => ({ ...prev, content: value }));
  };

  /* ✅ Validation */
  const validateForm = () => {
    const newErrors = {};

    if (!form.title) newErrors.title = "Title is required.";
    if (!form.subtitle) newErrors.subtitle = "Sub-title is required.";
    if (!form.content) newErrors.content = "Content cannot be empty.";
    if (!form.category) newErrors.category = "Select a category.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ✅ Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("content", form.content);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    const confirmation = await Swal.fire({
      title: "Edit Post",
      text: "Are you sure you want to edit this post?",
      icon: "question", // 💡 adds a nice confirmation icon
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (!confirmation.isConfirmed) return;

    const res = await dispatch(editPost({ id, formData }));

    if (editPost.fulfilled.match(res)) {
      navigate(`/post-details/${id}`);
    }
  };

  return (
    <div className="create-post-page">
      <h1 className="page-title">Edit Post</h1>

      {error && <div className="error-msg">{error}</div>}

      <form className="post-form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
          />
          {errors.title && <p className="error-msg">{errors.title}</p>}
        </div>

        {/* Subtitle */}
        <div className="form-group">
          <label>Sub title</label>
          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="form-input"
          />
          {errors.subtitle && <p className="error-msg">{errors.subtitle}</p>}
        </div>

        {/* Content */}
        <div className="form-group">
          <label>Content</label>
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
            className="form-input"
          />

          {errors.content && <p className="error-msg">{errors.content}</p>}
        </div>

        {/* ✅ Category Select */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="error-msg">{errors.category}</p>}
        </div>

        {/* Image */}
        <div className="form-group">
          <label>Featured Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {preview && (
            <img src={preview} alt="Preview" className="image-preview" />
          )}
        </div>

        <button type="submit" className="btn full" disabled={loading}>
          {loading ? "Saving..." : "Save Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
