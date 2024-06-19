import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { IoIosPeople } from "react-icons/io";
import { fetchInfo } from "../tools/foodSlice";
import { useParams } from "react-router-dom";
function Food() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.food);

  useEffect(() => {
    dispatch(fetchInfo(id));
  }, [dispatch]);

  if (state.isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div
          className="  inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
    );
  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen w-full">
      <div className=" bg-white p-3 m-auto max-w-3xl my-10 my-30 shadow-2xl  border-3 flex flex-col   rounded-2xl">
        <h1 className="text-xl font-semibold my-5 text-center font-monsteratt">
          {state.data && state.data.recipe.label}
        </h1>
        <div className=" w-full   ">
          <img
            src={state.data && state.data.recipe.image}
            className="w-full h-80 object-cover"
          />
        </div>

        <h3 className="text-lg text-center font-semibold mt-8 mb-3">
          RECIPE INGREDIENTS
        </h3>

        <div className="flex items-center justify-center mb-2">
          <span className="flex items-center text-md">
            <IoIosPeople className="mr-2" />

            <span className="ml-1 font-semibold block">
              {state.data && state.data.recipe.yield} people
            </span>
          </span>
        </div>

        <div className="p-3  flex  justify-center">
          <div></div>
          <ul className="grid md:grid-cols-2 sm:grid-cols-1 gap-2  ">
            {state.data &&
              state.data.recipe.ingredientLines.map((ingridient) => (
                <li
                  className="font-semibold text-sm m-3 list-decimal p-1 mx-4 "
                  key={nanoid()}
                >
                  {ingridient}
                </li>
              ))}
          </ul>
        </div>

        <button
          className="p-3 rounded-md bg-blue-500 mt-3 shadow-lg text-white "
          onClick={() => window.open(state.data.recipe.url)}
        >
          View Complete Recipe
        </button>
      </div>
    </div>
  );
}

export default Food;
