import { FC, useEffect, useState } from "react";
import Item, { ItemProps } from "./components/item";
import styles from "../src/styles/Home.module.css";

const LandingPage: FC = () => {
  const [storyItems, setStoryItems] = useState<ItemProps[]>([]);

  const allStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";

  function loadTopStories(url: string) {
    return fetch(url).then((response) => response.json());
  }
  function loadTenStories(arr: number[]) {
    const storyArr: number[] = [];
    if (arr.length > 10) {
      for (var i = 0; i < 10; i++) {
        storyArr.push(arr[Math.floor(Math.random() * arr.length)]);
      }
    }
    return storyArr;
  }

  function loadTenItems(arr: number[]) {
    const promises = arr.map((item) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
        })
        .then((item) => item as ItemProps)
    );
    return Promise.all(promises);
  }

  useEffect(() => {
    loadTopStories(allStoriesUrl)
      .then((stories) => loadTenStories(stories))
      .then((items) => loadTenItems(items))
      .then((itemArr) => {
        const sortedArr = [...itemArr].sort((a, b) => a.score - b.score);
        setStoryItems(sortedArr);
      });
  }, []);

  return (
    <div className={`${styles.main}`}>
      <div className={styles.title}>
        <h1>{`10 Random Hacker News Stories!`}</h1>
      </div>
      <div className={styles.content}>
        <>
          {storyItems &&
            storyItems.map((item, idx) => {
              return <Item key={idx} {...item} />;
            })}
        </>
      </div>
    </div>
  );
};

export default LandingPage;
