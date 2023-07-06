import { FaQuoteRight } from "react-icons/fa";
import moment from "moment";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Profile/ProfileContainer";

const ProfileContainer = () => {
  const { user, randomNumber } = useAppContext();
  return (
    <Wrapper>
      {/* <div>{JSON.stringify(user)}</div> */}
      <header>
        <div className="img-container">
          <img
            src={`https://randomuser.me/api/portraits/women/${randomNumber}.jpg`}
            alt={user.name}
            className="person-img"
          />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <div className="info">
          <h5>User Id Login :{user.name}</h5>
          <p className="job">email : {user.email}</p>
          <p className="job">_id : {user._id}</p>
        </div>
      </header>
      <div className="content-center"></div>

      <footer></footer>
    </Wrapper>
  );
};

export default ProfileContainer;
