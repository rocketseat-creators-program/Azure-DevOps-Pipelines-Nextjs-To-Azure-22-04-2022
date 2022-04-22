import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import itemsApiService from '../api/services/itemsApiService'
import IItem from '../models/IItem'
import styles from '../styles/Home.module.css'

interface IHomeProps {
  items: Array<IItem>,
  date: string
}

const Home: NextPage<IHomeProps> = ({ items, date }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Experts Example list</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">the experts list!</a>
        </h1>
        <div className={styles.grid}>
          { items.map(item => 
            <a key={item.id} href={`/details/${item.id}`} className={styles.card}>
              <h2>{item.name}</h2>
            </a>
          ) }
        </div>
      </main>

      <footer className={styles.footer}>
          Page generated at {date}
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const items = await itemsApiService.getList();
  const date = new Date().toISOString();
  return { props: { items, date } };
}

export default Home
