import Categories from "./components/Categories";
import CTA from "./components/CTA";
import Hero from "./components/Hero";
import ReactPosts from "./components/ReactPosts";
import VueJsPosts from "./components/VueJsPosts";
import PythonPosts from "./components/PythonPosts";
import NextJsPosts from "./components/NextJsPosts";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="section">
        <ReactPosts />
      </div>
      <div className="section">
        <NextJsPosts />
      </div>
      <div className="section">
        <VueJsPosts />
      </div>
      <PythonPosts />
      <Categories />
      <CTA />
    </>
  );
};

export default Home;
