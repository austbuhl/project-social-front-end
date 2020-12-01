import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { resetActivity, setActivity, removeActivity } from '../../redux/actions'
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
  FaSwimmingPool,
  FaTablets,
  FaMonument,
  FaLeaf,
  FaRunning,
  FaHippo,
  FaChild,
  FaCanadianMapleLeaf,
  FaUndoAlt,
} from 'react-icons/fa'
import {
  GiCricketBat,
  GiTennisCourt,
  GiCanoe,
  GiBarbecue,
} from 'react-icons/gi'

const Filter = ({
  selectedActivity,
  setActivity,
  removeActivity,
  resetActivity,
}) => {
  const clickHandler = (e) => {
    let activity = e.target.closest('button').name
    if (activity === 'Reset') {
      resetActivity()
    } else {
      !selectedActivity.includes(activity)
        ? setActivity(activity)
        : removeActivity(activity)
    }
  }

  return (
    <div onClick={clickHandler}>
      <Button.Group icon floated='left' vertical size='large' basic>
        <Button name='Reset' icon={<FaUndoAlt />} />
        <Button
          name='Art'
          active={selectedActivity.includes('Art')}
          icon={<FaPalette />}
        />
        <Button
          name='Barbecue'
          active={selectedActivity.includes('Barbecue')}
          icon={<GiBarbecue />}
        />
        <Button
          name='Basketball'
          active={selectedActivity.includes('Basketball')}
          icon={<FaBasketballBall />}
        />
        <Button
          name='Beach'
          active={selectedActivity.includes('Beach')}
          icon={<FaUmbrellaBeach />}
        />
        <Button
          name='Bocce'
          active={selectedActivity.includes('Bocce')}
          icon={<FaTablets />}
        />
        <Button
          name='Cricket'
          active={selectedActivity.includes('Cricket')}
          icon={<GiCricketBat />}
        />
        <Button
          name='Dog Run'
          active={selectedActivity.includes('Dog Run')}
          icon={<FaDog />}
        />
        <Button
          name='Handball'
          active={selectedActivity.includes('Handball')}
          icon={<FaRegHandSpock />}
        />
        <Button
          name='Hiking'
          icon={<FaHiking />}
          active={selectedActivity.includes('Hiking')}
        />
        <Button
          name='Horseback Riding'
          active={selectedActivity.includes('Horseback Riding')}
          icon={<FaHorse />}
        />
        <Button
          name='Ice Skating'
          active={selectedActivity.includes('Ice Skating')}
          icon={<FaSkating />}
        />
        <Button
          name='Indoor Pool'
          active={selectedActivity.includes('Indoor Pool')}
          icon={<FaSwimmingPool />}
        />
        <Button
          name='Kayaking'
          active={selectedActivity.includes('Kayaking')}
          icon={<GiCanoe />}
        />
        <Button
          name='Monument'
          active={selectedActivity.includes('Monument')}
          icon={<FaMonument />}
        />
        <Button
          name='Nature Center'
          active={selectedActivity.includes('Nature Center')}
          icon={<FaCanadianMapleLeaf />}
        />
        <Button
          name='Nature Preserve'
          active={selectedActivity.includes('Nature Preserve')}
          icon={<FaLeaf />}
        />
        <Button
          name='Outdoor Pool'
          active={selectedActivity.includes('Outdoor Pool')}
          icon={<FaSwimmer />}
        />
        <Button
          name='Playground'
          active={selectedActivity.includes('Playground')}
          icon={<FaChild />}
        />
        <Button
          name='Running Track'
          active={selectedActivity.includes('Running Track')}
          icon={<FaRunning />}
        />
        <Button
          name='Tennis'
          active={selectedActivity.includes('Tennis')}
          icon={<GiTennisCourt />}
        />
        <Button
          name='Zoo'
          active={selectedActivity.includes('Zoo')}
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
    removeActivity: (activity) => dispatch(removeActivity(activity)),
    resetActivity: () => dispatch(resetActivity()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
