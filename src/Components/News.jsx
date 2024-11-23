import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import propTypes, { string } from 'prop-types'
import InfiniteSroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'

const News = (props) => {
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
    //document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`

   const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase()+string.slice(1)
    }
   const updateNews= async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }
    useEffect(()=>{
        updateNews()
    },[])

    // const handlePrevclick = async () => {

    //     setPage(page-1)
    //     updateNews()
    // }

    // const handleNextclick = async () => {

    //setPage(page+1)
    // updateNews()
    // }

    const fetchMoreData =  async () =>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

        return (
            <>
                <h2 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsLine - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading&&<Spinner/>}
                <InfiniteSroll 
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                    >
                    <div className='container'>
                        <div className="row">
                            {articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 88) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>
                </InfiniteSroll>
            </>
        );
    }


News.defaultprops ={
    country:'us',
    pageSize: 8,
    category:'general',
}
News.propTypes= {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
}
export default News;
