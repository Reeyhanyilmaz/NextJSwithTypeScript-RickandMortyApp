import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { IEpisodes } from "../types/types";
import styles from "../styles/Episodes.module.css";
import type { NextPageWithLayout } from "next";
import Image from "next/image";
import imageLoader from "../imageLoader";

const Episodes: NextPageWithLayout<{ episodes: IEpisodes[] }> = ({
  episodes,
}) => {
  return (
    // <div>{JSON.stringify(episodes)}</div>
    <div className={styles.container}>
      <Head>
        <title>Episodes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/episod.jpg" />
      </Head>

      {episodes.map((items) => {
        return (
          <div key={items.id} className={styles.content}>
            <h3>{items.name}</h3>
            <p>
              <Image
                loader={imageLoader}
                unoptimized
                src="/timetable.png"
                alt="time"
                width="30px"
                height="30px"
              />
              <span className={styles.write}>{items.air_date}</span>
            </p>

            <p>
              <Image
                loader={imageLoader}
                unoptimized
                src="/chapter.png"
                alt="episode"
                width="30px"
                height="30px"
              />
              <span className={styles.write}> {items.episode}</span>
            </p>

            <p>
              <Image
                loader={imageLoader}
                unoptimized
                src="/create.png"
                alt="created"
                width="30px"
                height="30px"
              />
              <span className={styles.write}>{items.created}</span>
            </p>

            {items.characters.map((item) => {
              return (
                <li key={item} className={styles.list}>
                  <Image
                    loader={imageLoader}
                    unoptimized
                    src="/check.png"
                    alt="check"
                    width="30px"
                    height="30px"
                  />
                  <span className={styles.write}>{item}</span>
                </li>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

Episodes.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/episode");

  const { results } = await res.json();

  return {
    props: {
      episodes: results,
    },
  };
};

export default Episodes;
