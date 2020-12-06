import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import * as Ethereum from './services/Ethereum'
import styles from './App.module.css'
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import Web3 from 'web3'
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let input = fs.readFileSync('./home/zahrof/Documents/Master2/DAAR/Projet2/decentralized-wikipedia/build/build/build/contracts/Wikipedia.json', 'utf8');
let output = solc.compile(input, 1)

var abi = JSON.parse()
var ZombieFactoryContract = web3.eth.contract(abi)
var contractAddress  /* our contract address on Ethereum after deploying */;
var ZombieFactory = ZombieFactoryContract.at(contractAddress)

const NewArticle = () => {
  const [editor, setEditor] = useState(null)
  useEffect(() => {
    setEditor(new MediumEditor(`.${styles.editable}`))
  }, [setEditor])
  return (
    <form>
      <div className={styles.subTitle}>New article</div>
      <div className={styles.mediumWrapper}>
        <textarea className={styles.editable} />
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

const Home = () => {
  return (
    <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/article/new">Add an article</Link>
      <Link to="/article/all">All articles</Link>
      <Link to="/article/read">Read an article</Link>
      <Link to="/article/update">Update an articles</Link>
    </div>
  )
}

const AllArticles = () => {
  return (
      <div className={styles.links}>
        <button id="#Button"type="button">Click Me!</button>
      </div>
  )
}

const NotFound = () => {
  return <div>Not found</div>
}

const ReadArticle = () => {
  const [articles, setArticles] = useState([])
  const contract = useSelector(({ contract }) => contract)
  useEffect(() => {
    if (contract) {
      contract.methods.articleContent(0).call().then(console.log)
      contract.methods.getAllIds().call().then(console.log)
    }
  }, [contract, setArticles])
  return <div>{articles.map(article => article)}</div>
}

const UpdateArticle = () => {
  const [articles, setArticles] = useState([])
  const contract = useSelector(({ contract }) => contract)
  useEffect(() => {
    if (contract) {
      contract.methods.articleContent(0).call().then(console.log)
      contract.methods.getAllIds().call().then(console.log)
    }
  }, [contract, setArticles])
  return <div>{articles.map(article => article)}</div>
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Ethereum.connect)
  }, [dispatch])
  return (
    <div className={styles.app}>
      <div className={styles.title}>Welcome to Decentralized Wikipedia</div>
      <Switch>
        <Route path="/article/new">
          <NewArticle />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/article/all">
          <AllArticles />
        </Route>

        <Route path="/article/read">
          <ReadArticle />
        </Route>

        <Route path="/article/update">
          <UpdateArticle />
        </Route>

        <Route>
          <NotFound />
        </Route>

      </Switch>
    </div>
  )
}

export default App
