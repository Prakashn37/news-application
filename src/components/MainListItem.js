import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SubListItem from './SubListItem'
import axios from 'axios'

const styles = theme => ({
    root: {
        width: '90%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class AlignItemsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showArticles: false,
            articles: []
        }
        this.key = 0
    }

    componentDidMount() {
    }

    onClick = () => {
        this.setState(() => ({
            showArticles: !this.state.showArticles
        }))
        if (!this.state.showArticles) {
            axios.get(`https://newsapi.org/v1/articles?source=${this.props.source.id}&apiKey=91a53883772d44bf8ee89d81249d4ac7`).then((res) => {
                let articles = res.data.articles
                this.setState(() => (
                    {
                        articles
                    }
                )
                )
            })
        }
    }
    render() {
        const { classes, source } = this.props;
        return (
            <React.Fragment>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start" onClick={this.onClick}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={source.urlsToLogos.small} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={source.name}
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                        {`${source.category} - `}
                                    </Typography>
                                    {source.description}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
                {
                    this.state.showArticles && this.state.articles.map((article) => (
                        <SubListItem
                            key={this.key++}
                            {...article}
                        />))
                }

            </React.Fragment>

        );
    }
}

AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);