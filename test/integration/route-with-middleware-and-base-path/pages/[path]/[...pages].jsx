import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
  return router.query.path ? <h1 id="title">path:{router.query.path}</h1> : null
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default Index
