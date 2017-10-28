import React, { Component } from "react";
import FontAwesome from 'react-fontawesome';
import './DateCard.css';
import { Button, Card, CardBody, CardLink, CardTitle, CardSubtitle, CardText, Collapse } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux'
import { upvote, downvote, unvote, attendEvent } from '../../actions/eventActions'

class DateCard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  clickUpvote = (eventId, userId) => {
    this.props.upvote(eventId, userId)
    // insert conditional stuff here
  }

  clickDownvote = (eventId, userId) => {
    this.props.downvote(eventId, userId)
    // insert conditional stuff here
  }

  clickUnvote = (eventId, userId) => {
    this.props.unvote(eventId, userId)
  }

  clickAttend = (eventId, userId) => {
    this.props.attendEvent(eventId, userId)
  }

  render() {

    // attend button
    let attend = <Button size="sm" className="button-primary" onClick={() => this.clickAttend(this.props.event._id, this.props.user._id)}> Attend </Button>

    // upvote button
    let upvote = <FontAwesome onClick={() => this.clickUpvote(this.props.event._id, this.props.user._id)} className="up-vote" name="thumbs-o-up" size="2x" color="gray"></FontAwesome>;

    // downvote button
    let downvote = <FontAwesome onClick={() => this.clickDownvote(this.props.event._id, this.props.user._id)} className="down-vote" name="thumbs-o-down" size="2x" color="gray"></FontAwesome>

    // Do some checks to see if the user is logged in
    if (!this.props.user) {
      attend = <Button size='sm' className='button-primary disabled'> Attend </Button>

      upvote = <FontAwesome disabled='true' className="up-vote" name="thumbs-o-up" size="2x" color="gray"></FontAwesome>;

      downvote = <FontAwesome disabled='true' className="down-vote" name="thumbs-o-down" size="2x" color="gray"></FontAwesome>
    }
    else {  
      // If user has already clicked to attend, show unattend
      if (this.props.event.attendingList.includes(this.props.user._id)) {
        attend = <Button size="sm" className="button-primary" onClick={() => this.clickAttend(this.props.event._id, this.props.user._id)}> Attending </Button>
      }

      // if user has upvoted already, sub unvote function, change color
      if (this.props.event.vote.positive.includes(this.props.user._id)) {
        upvote = <FontAwesome onClick={() => this.clickUnvote(this.props.event._id, this.props.user._id)} className="up-vote-active" name="thumbs-o-up" size="2x"></FontAwesome>
      }

      // if user has downvoted already, sub unvote function, change color
      if (this.props.event.vote.negative.includes(this.props.user._id)) {
        downvote = <FontAwesome onClick={() => this.clickUnvote(this.props.event._id, this.props.user._id)} className="down-vote-active" name="thumbs-o-down" size="2x"></FontAwesome>
      }
      
    }
    
    
    return (
      <Card key={this.props.event._id}>
        <CardBody>
          <CardTitle>{this.props.event.name}</CardTitle>
          <CardSubtitle tag="h5">{this.props.event.location}</CardSubtitle>
          <CardText >
            <span>
              {moment(this.props.event.date).format('ddd, MMMM D')} - {moment(this.props.event.startTime, 'HH:mm').format('h:mmA')}
              {
                (this.props.event.endTime.length !== 0) ? ' to ' + moment(this.props.event.endTime, 'HH:mm').format('h:mmA') : ''
              }
            </span>
          </CardText>
          <CardText>
            {
              (this.props.event.allDay === true) ?
              <FontAwesome
                className="card-extras"
                name="sun-o"
                title="All Day Event">
              </FontAwesome> : ''
            }
            {
            (this.props.event.kidFriendly === true) ?
              <FontAwesome
                className="card-extras"
                name="child"
                title="Kid Friendly">
              </FontAwesome> : ''
            }
            {
            (this.props.event.petFriendly === true) ?
              <FontAwesome
                className="card-extras"
                name="paw"
                title="Pet Friendly">
              </FontAwesome> : ''
            }
          </CardText>
          <div className="card-buttons">
            <Button
              size="sm"
              className="button-primary" onClick={this.toggle}>
              More Info
            </Button>
            {attend}
            <div className="card-votes">
              <div className="card-vote up">
                {upvote}
                <span>{this.props.event.vote.positive && this.props.event.vote.positive.length}</span>
              </div>
              <div className="card-vote down">
                {downvote}
                <span>{this.props.event.vote.negative && this.props.event.vote.negative.length}</span>

              </div>
            </div>
          </div>
          <Collapse isOpen={this.state.collapse}>
            <div className="line-container">
              <hr className="line-style" />
            </div>
            <CardText>{this.props.event.description}</CardText>
            <CardLink href={this.props.event.link}>Visit Website</CardLink>
          </Collapse>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authUser.user
})

export default connect(mapStateToProps, { upvote, downvote, unvote, attendEvent })(DateCard)
