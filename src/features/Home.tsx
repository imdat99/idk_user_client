import SelectDemo from 'components/Select'
import useSWR from 'swr'

const Home = () => {
  const {data, error, isLoading} = useSWR('/todos/1')
  return (
    <SelectDemo/>
  )
}

export default Home