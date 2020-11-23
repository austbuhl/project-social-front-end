import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { resetActivity, setActivity } from '../../redux/actions'
import {
  FaPalette,
  FaUmbrellaBeach,
  FaBasketballBall,
  FaDog,
  FaRegHandSpock,
  FaHiking,
  FaHorse,
  FaSkating,
  FaSwimmer,
  FaTablets,
  FaMonument,
  FaLeaf,
  FaRunning,
  FaHippo,
  FaUndoAlt,
} from 'react-icons/fa'
import {
  GiCricketBat,
  GiTennisCourt,
  GiCanoe,
  GiBarbecue,
} from 'react-icons/gi'

const Filter = ({ selectedActivity, setActivity, resetActivity }) => {
  const clickHandler = (e) => {
    let activity = e.target.closest('button').name
    if (activity === 'Reset') {
      resetActivity()
    } else {
      selectedActivity !== activity ? setActivity(activity) : resetActivity()
    }
  }

  return (
    <div onClick={clickHandler}>
      <Button.Group icon floated='left' vertical size='large' basic>
        <Button name='Reset' icon={<FaUndoAlt />} />
        <Button
          name='Art'
          active={selectedActivity === 'Art'}
          icon={<FaPalette />}
        />
        <Button
          name='Barbecue'
          active={selectedActivity === 'Barbecue'}
          icon={<GiBarbecue />}
        />
        <Button
          name='Basketball'
          active={selectedActivity === 'Basketball'}
          icon={<FaBasketballBall />}
        />
        <Button
          name='Beach'
          active={selectedActivity === 'Beach'}
          icon={<FaUmbrellaBeach />}
        />
        <Button
          name='Bocce'
          active={selectedActivity === 'Bocce'}
          icon={<FaTablets />}
        />
        <Button
          name='Cricket'
          active={selectedActivity === 'Cricket'}
          icon={<GiCricketBat />}
        />
        <Button
          name='Dog Run'
          active={selectedActivity === 'Dog Run'}
          icon={<FaDog />}
        />
        <Button
          name='Handball'
          active={selectedActivity === 'Handball'}
          icon={<FaRegHandSpock />}
        />
        <Button
          name='Hiking'
          icon={<FaHiking />}
          active={selectedActivity === 'Hiking'}
        />
        <Button
          name='Horseback Riding'
          active={selectedActivity === 'Horseback Riding'}
          icon={<FaHorse />}
        />
        <Button
          name='Ice Skating'
          active={selectedActivity === 'Ice Skating'}
          icon={<FaSkating />}
        />
        <Button
          name='Indoor Pool'
          active={selectedActivity === 'Indoor Pool'}
          icon={<FaSwimmer />}
        />
        <Button
          name='Kayaking'
          active={selectedActivity === 'Kayaking'}
          icon={<GiCanoe />}
        />
        <Button
          name='Monument'
          active={selectedActivity === 'Monument'}
          icon={<FaMonument />}
        />
        <Button
          name='Nature Center'
          active={selectedActivity === 'Nature Center'}
          icon={<FaLeaf />}
        />
        <Button
          name='Running Track'
          active={selectedActivity === 'Running Track'}
          icon={<FaRunning />}
        />
        <Button
          name='Tennis'
          active={selectedActivity === 'Tennis'}
          icon={<GiTennisCourt />}
        />
        <Button
          name='Zoo'
          active={selectedActivity === 'Zoo'}
          icon={<FaHippo />}
        />
      </Button.Group>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedActivity: state.selectedActivity,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivity: (activity) => dispatch(setActivity(activity)),
    resetActivity: () => dispatch(resetActivity()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
