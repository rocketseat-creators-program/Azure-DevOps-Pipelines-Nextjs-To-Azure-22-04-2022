import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import itemsApiService from '../../api/services/itemsApiService'
import IItem from '../../models/IItem'
import styles from '../../styles/Home.module.css'

interface IDetailsProps {
  item: IItem,
  date: string
}

const Details: NextPage<IDetailsProps> = ({ item, date }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{item?.name}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {item?.name}
        </h1>
        <div className={styles.grid}>
          id: #{ item.id }
        </div>
        <br />
        <Link href="/">
          <a>&larr; voltar</a>
        </Link>
      </main>

      <footer className={styles.footer}>
          Page generated at {date}
      </footer>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = 
  async () => ({ paths: [], fallback: true });

export const getStaticProps: GetStaticProps<IDetailsProps> = async (context) => {
  const { id } = context.params as any;
  const item = await itemsApiService.getDetail(id);
  const date = new Date().toISOString();
  return { props: { item, date }, revalidate: 60 };
}

export default Details
