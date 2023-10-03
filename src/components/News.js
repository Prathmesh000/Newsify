import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner"
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        console.log("Constructorrr");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey - ${this.props.category}`;
    }
    async UpdateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ba9d4c5bef543969a03b9cb4e5aedeb&page=1&pageSize=${this.props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles,
        //      totalResults: parsedData.totalResults,
        //     loading: false })

        this.UpdateNews();
    }
    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?{this.props.country}&category=${this.props.category}&apiKey=4ba9d4c5bef543969a03b9cb4e5aedeb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 })
        this.UpdateNews()
    }

    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?{this.props.country}&category=${this.props.category}&apiKey=4ba9d4c5bef543969a03b9cb4e5aedeb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading: true})
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        // }

        this.setState({ page: this.state.page + 1 })
        this.UpdateNews()
    }

    // fetchMoreData = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ba9d4c5bef543969a03b9cb4e5aedeb&page=${this.state.page}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({
    //         articles: this.state.articles.concat(parsedData.articles),
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     })
    // };

    render() {
        return (
            <div className="container my-4">
                <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>

                {/* <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults }
                    loader={<Spinner/>}
                >
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}

                </div>
                </InfiniteScroll> */}

                {<div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark"
                        onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark"
                        onClick={this.handleNextClick}>Next &rarr;</button>
                </div>}
            </div>
        )
    }
}
