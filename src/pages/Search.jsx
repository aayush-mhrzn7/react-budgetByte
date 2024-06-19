import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReciepe } from "../tools/reciepeSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { fetchInfo } from "../tools/foodSlice";
import { Link } from "react-router-dom";
import { GiWok } from "react-icons/gi";
function Search() {
  const [searchReciepe, setSearchRecipe] = useState("bread");
  const [recipeId, setrecipeID] = useState(null);
  const stat = useSelector((state) => state.reciepe);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchInfo(recipeId));
    }
  }, [recipeId, dispatch]);

  useEffect(() => {
    if (searchReciepe) {
      dispatch(fetchReciepe(searchReciepe));
    }
  }, []);

  const handleFoodInfo = (data) => {
    const url = new URL(data);
    const pathname = url.pathname;
    const pathSegments = pathname.split("/");
    var recid = pathSegments[pathSegments.length - 1];
    dispatch(fetchInfo(recid));
    setrecipeID(recid);

    return recid;
  };

  if (stat.isLoading)
    return (
      <div className="h-screen w-full flex justify-center flex-col items-center">
        <div
          className="  inline-block h-8 w-8 mb-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <div>Recipes that inspire you to do more!</div>
      </div>
    );
  return (
    <div className="h-screen w-full ">
      <h1 className="text-3xl font-mons flex justify-center  mt-10 font-semibold">
        Budget Bytes <GiWok className="ml-2" />
      </h1>
      <form
        className=" flex justify-center p-4 "
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(fetchReciepe(searchReciepe));
        }}
      >
        <div className=" lg:w-1/2 lg:flex-grow-0 p-4 sm:w-full flex xl:flex-row md:flex-row md:flex-grow  sm:flex-grow gap-2">
          <input
            className="p-4 w-full text-sm border-2 font-semibold capitalize rounded-sm text-slate-500"
            type="text"
            placeholder="search over 100,000 recipes..."
            onChange={(e) => setSearchRecipe(e.target.value)}
          />
          <button
            type="submit"
            className="lg:w-40 rounded-sm bg-black p-4 font-semibold text-white md:w-40 "
          >
            Search
          </button>
        </div>
      </form>
      <section className="p-10 flex justify-center flex-wrap">
        <ul className="grid gap-8 lg:grid-cols-4 grid-flow-row sm:grid-cols-2">
          {stat.data &&
            stat.data.hits.map((e) => {
              const recid = e.recipe.uri.split("_").pop();
              return (
                <li
                  key={nanoid()}
                  className="p-4 text-start font-semibold rounded-md shadow-xl hover:cursor-pointer hover:border-4 hover:ease-out hover:animate-pulse"
                  onClick={() => handleFoodInfo(e._links.self.href)}
                >
                  <Link to={`/${recid}`}>
                    <img
                      src={e.recipe.image}
                      alt="img"
                      className="w-full object-fit rounded-md"
                    />
                    <span className="mt-3 mx-1 inline-block p-1 rounded-md capitalize font-medium bg-green-200">
                      {e.recipe.cuisineType}
                    </span>
                    <p className="mx-2 my-1 text-xl text-slate-800 font-semibold">
                      {e.recipe.label}
                    </p>
                    <span className="mx-2 block font-medium">
                      {e.recipe.source}
                    </span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
      <footer>
        <h1 className="my-5 text-lg text-center font-semibold">
          Designed & Developed by -Aayush Maharjan
        </h1>
      </footer>
    </div>
  );
}

export default Search;
