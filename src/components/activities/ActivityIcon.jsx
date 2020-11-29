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
  FaSwimmingPool,
  FaTablets,
  FaMonument,
  FaLeaf,
  FaRunning,
  FaHippo,
  FaChild,
  FaCanadianMapleLeaf,
} from 'react-icons/fa'
import {
  GiCricketBat,
  GiTennisCourt,
  GiCanoe,
  GiBarbecue,
} from 'react-icons/gi'

const ActivityIcon = ({ activity }) => {
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
    'Indoor Pool': <FaSwimmingPool />,
    Kayaking: <GiCanoe />,
    Monument: <FaMonument />,
    'Nature Center': <FaCanadianMapleLeaf />,
    'Nature Preserve': <FaLeaf />,
    'Outdoor Pool': <FaSwimmer />,
    Playground: <FaChild />,
    'Running Track': <FaRunning />,
    Tennis: <GiTennisCourt />,
    Zoo: <FaHippo />,
  }

  return icons[activity] || null
}

export default ActivityIcon
