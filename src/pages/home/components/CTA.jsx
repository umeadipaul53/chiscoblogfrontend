import React from "react";
import "../../../styles/home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CTA = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="cta homePage">
      {!isAuthenticated ? (
        <>
          <h2>Ready to share your knowledge?</h2>
          <p>Join developers writing real-world content.</p>
          <br />
          <Link to="/register" className="btn white">
            Create an account
          </Link>
        </>
      ) : (
        <>
          <h2>Welcome back</h2>
          <p>Start sharing your ideas with the community.</p>
          <br />
          <Link to="/create-post" className="btn white">
            Create a post
          </Link>
        </>
      )}
    </section>
  );
};

export default CTA;
