import useSWR from 'swr'

const Home = () => {
  const {data, error, isLoading} = useSWR('/todos/1')
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Home