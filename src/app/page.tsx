"use client";

import React, { useEffect, useState } from "react";
import getStories from "./actions/getStories";
import type { Story } from "./actions/getStories";

export default function Page() {
  const [stories, setStories] = useState<Array<Story>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const handleClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    const fetchStories = async () => {
      try {
        const response = await getStories(page);
        const newStories = response.props.stories;
        setStories((prevStories) => [...prevStories, ...newStories]);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [page, hasMounted]);

  return (
    <div className="flex flex-col p-6 justify-center items-center bg-[#FFEAC6] space-y-[2rem] text-black">
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <div
            className="text-orange-500 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </div>
      ) : (
        <>
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex rounded-3xl p-8 justify-between space-x-8 bg-[#fffbeb] shadow-md"
            >
              <div className="flex w-[50%]">
                <img
                  src={story.hero_image.url}
                  alt={story.title}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col w-[50%] justify-center">
                <p className="text-4xl font-bold mb-6">{story.title}</p>
                {story.dek ? (
                  <div dangerouslySetInnerHTML={{ __html: story.dek }} />
                ) : (
                  <p className="text-gray-500 italic">
                    Snippet for this story is not available at the moment.
                  </p>
                )}
              </div>
            </div>
          ))}
          <button
            className="font-semibold border-2 border-orange-500 p-4 rounded-lg w-[10rem] hover:bg-orange-400 hover:text-white active:bg-orange-600 transition-colors duration-250 ease-in-out"
            onClick={handleClick}
          >
            Load more
          </button>
        </>
      )}
    </div>
  );
}
