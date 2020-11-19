import React from 'react'
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
} from 'react-icons/fa'
import {
  GiCricketBat,
  GiTennisCourt,
  GiCanoe,
  GiBarbecue,
} from 'react-icons/gi'

const ActivityIcon = ({ activity }) => {
  // need icons for every activity - font awesome?

  const icons = {
    Art: <FaPalette />,
    Barbecue: <GiBarbecue />,
    Basketball: <FaBasketballBall />,
    Beach: <FaUmbrellaBeach />,
    Bocce: <FaTablets />,
    Cricket: <GiCricketBat />,
    'Dog Run': <FaDog />,
    Handball: <FaRegHandSpock />,
    Hiking: <FaHiking />,
    'Horseback Riding': <FaHorse />,
    'Ice Skating': <FaSkating />,
    'Indoor Pool': <FaSwimmer />,
    // 'Outdoor Pool': ,
    Kayaking: <GiCanoe />,
    Monument: <FaMonument />,
    'Nature Center': <FaLeaf />,
    'Running Track': <FaRunning />,
    Tennis: <GiTennisCourt />,
    Zoo: <FaHippo />,
  }

  return icons[activity] || null
  // return <i className='fas fa-mug-hot'></i>
  return
}

export default ActivityIcon
