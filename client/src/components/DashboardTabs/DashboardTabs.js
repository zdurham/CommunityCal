import React, { Component } from "react";
import { connect } from 'react-redux';
import './DashboardTabs.css';
import DateCard from '../DateCard'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { getUserEvents, deleteEvent, getUserAttending } from '../../actions/eventActions';

class DashboardTabs extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
  componentDidMount = () => {
    this.props.getUserEvents(this.props.user._id)
    this.props.getUserAttending(this.props.user._id)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Attending
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Added
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {(!this.props.attendingEvents || this.props.attendingEvents.length === 0) ? (
                  <h5 className="tab-message">You're not attending any events</h5>
                ) : (
                    this.props.attendingEvents.map(event => (
                      <DateCard key={event._id} event={event} deleteBtn={false}/>
                    )
                  )
                )
                }
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {(!this.props.userEvents || this.props.userEvents.length === 0)? (
                  <h5 className="tab-message">You haven't added any events</h5>
                ) : (
                    this.props.userEvents.map(event => (
                      <DateCard key={event._id} event={event} deleteBtn={true} />
                    )
                  )
                )
                }
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserEvents(userId) {
    dispatch(getUserEvents(userId))
  }
})

const mapStateToProps = state => ({
  user: state.authUser.user,
  userEvents: state.events.userEvents,
  attendingEvents: state.events.userAttendingEvents
})

export default connect(mapStateToProps, { getUserEvents, getUserAttending })(DashboardTabs)
