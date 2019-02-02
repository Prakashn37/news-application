import React from 'react'
import axios from 'axios'
import MainListItem from './MainListItem'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sources: [],
        }
        this.key = 0
    }

    componentDidMount() {
        axios.get('https://newsapi.org/v1/sources').then((res) => {
            let sources = res.data.sources
            console.table(sources)
            this.setState(() => ({
                sources
            }))
        })
    }

    render() {
        return (
            <div>
                <h1>News Application</h1>
                {
                    this.state.sources.map((source) => (
                        <MainListItem
                            key={this.key++}
                            source={source}
                        />
                    )
                    )
                }
            </div>
        )
    }
}