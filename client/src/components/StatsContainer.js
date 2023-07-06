import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "jobs sample request ที่กำลังทำ",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "jobs sample request สำเร็จ",
      count: stats.success || 0,
      icon: <FaCalendarCheck />,
      color: "#8dc992",
      bcg: "#e3f2e5",
    },
    {
      title: "jobs sample request ทั้งหมด",
      count: stats.totals || 0,
      icon: <FaBug />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
