import { IoBarChartSharp } from 'react-icons/io5';
import { MdOutlineBorderColor, MdQueryStats } from 'react-icons/md';
import { FaUsers, FaWpforms } from 'react-icons/fa';
import { ImProfile, ImStatsBars } from 'react-icons/im';
import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";
import {MdPassword} from 'react-icons/md'
import { BsPersonCircle } from "react-icons/bs";
import {ImStatsDots} from 'react-icons/im'
const links = [
  {
    id: 1,
    text: 'products stats',
    path: '/',
    icon: <ImStatsBars />,
  },
  {
    id: 7,
    text: 'orders stats',
    path: 'orders-stats',
    icon: <ImStatsDots />,
  },
  {
    id: 2,
    text: 'all products',
    path: 'all-products',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add product',
    path: 'add-product',
    icon: <AiOutlineFileText />,
  },
  {
    id: 5,
    text: 'all users',
    path: 'all-users',
    icon: <FaUsers />,
  },
  {
    id: 6,
    text: 'all orders',
    path: 'all-orders',
    icon: <MdOutlineBorderColor />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <BsPersonCircle />,
  },
  {
    id: 8,
    text: 'update password',
    path: 'update-password',
    icon: <MdPassword />,
  },
];


export default links;