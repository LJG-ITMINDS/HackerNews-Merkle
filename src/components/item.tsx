import { FC, useEffect, useState } from "react";
import styles from "../styles/Item.module.css";
import { ItemType } from "../types/itemTypes";
import { UserData } from "../types/userType";

export interface ItemProps {
  id: number;
  deleted?: boolean;
  type: string;
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: string;
  poll?: string;
  kids?: number[];
  url: string;
  score: number;
  title: string;
  parts?: number[];
  descendants?: number;
}

const Item: FC<ItemProps> = ({
  id,
  type,
  by,
  time,
  text,
  url,
  score,
  title,
}) => {
  const date = new Date(time * 1000);
  const [karma, setKarma] = useState(0);
  async function fetchKarma(val: string) {
    return fetch(`https://hacker-news.firebaseio.com/v0/user/${val}.json`)
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error: ", error);
      })
      .then((user) => user as UserData);
  }
  useEffect(() => {
    fetchKarma(by).then((user) => setKarma(user.karma));
  }, []);
  const imgId = Math.floor(Math.random() * 8); // Select random image
  return (
    <div className={`item ${styles.card} ${url ? styles.link : ""}`}>
      <a className={url ? styles.link : styles.hiddenLink} href={url}>
        <div className={`${styles.header} `}>
          <h3>
            {score > 0 ? "+" : "-"}
            {score}
          </h3>
          <h3>{title}</h3>
        </div>
        <div className={styles.media}>
          <img src={`../src/assets/${imgId > 0 ? imgId : 1}.png`} alt="" />
        </div>
        <div className={`${styles.bottom}`}>
          <h5>{`Published: ${date.toLocaleString()}`}</h5>
          <div className={styles.credit}>
            <h5>{`By ${by}`}</h5>
            <h5>{`Author karma: ${karma}`}</h5>
          </div>
        </div>
      </a>
    </div>
  );
};
export default Item;
