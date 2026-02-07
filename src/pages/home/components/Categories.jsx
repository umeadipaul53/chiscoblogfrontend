import "../../../styles/home.css";
import { Link } from "react-router-dom";

const categories = ["NodeJs", "React", "Python", "VueJs", "NextJs"];

const Categories = () => {
  return (
    <section className="categories homePage">
      <div className="container">
        <h2>Topics</h2>

        <div className="category-list">
          {categories.map((cat) => {
            let attr;

            if (cat === "NodeJs") {
              attr = "nodejs";
            } else if (cat === "React") {
              attr = "react";
            } else if (cat === "Python") {
              attr = "python";
            } else if (cat === "VueJs") {
              attr = "vuejs";
            } else if (cat === "NextJs") {
              attr = "nextjs";
            }

            return (
              <Link key={cat} to={attr}>
                <span className="category-chip">{cat}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
