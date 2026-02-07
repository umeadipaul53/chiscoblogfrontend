import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/post.css";
import { createPost } from "../reducers/postReducer";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.post);
  const [form, setForm] = useState({
    title: "",
    content: "",
    subtitle: "",
    category: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  // Simple validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required.";
    if (!form.subtitle) newErrors.subtitle = "Sub-title is required.";
    if (!form.content) newErrors.content = "Content cannot be empty.";
    if (!form.category) newErrors.category = "Select a category.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Use FormData for image upload
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("content", form.content);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    const res = await dispatch(createPost(formData));

    if (createPost.fulfilled.match(res)) {
      setForm({
        title: "",
        subtitle: "",
        content: "",
        category: "",
        image: null,
      });
      setPreview(null);
      navigate("/my-posts");
    }
  };

  return (
    <div className="create-post-page">
      <h1 className="page-title">Create New Post</h1>
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

        {/* Sub-title */}
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

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">-- Select Category --</option>
            <option value="NodeJs">NodeJs</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="VueJs">VueJs</option>
            <option value="NextJs">NextJs</option>
          </select>
          {errors.category && <p className="error-msg">{errors.category}</p>}
        </div>

        {/* Image Upload */}
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
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
