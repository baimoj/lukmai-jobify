import { AiOutlineCloseSquare, AiOutlineClose } from "react-icons/ai";
// import CloseIcon from "@material-ui/icons/Close";

import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: "flex";
  align-items: "center";
  justify-content: "center";
  color: var(--black);
  .container {
    position: "relative";
    background: "white";
    border-radius: "8px";
    width: "250px";
    padding: "20px 10px";
    animation: "dropTop .3s linear";
  }
`;

const Popup = (props) => {
  const { title, children, footer, openPopup, setOpenPopup, data } = props;

  return (
    <Wrapper
      onClick={setOpenPopup.bind(this, false)}
      style={{
        position: "fixed",

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          width: "650px",
          background: "#f4fafd",
          padding: "20px 10px",
          animation: "dropTop .3s linear",
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: "0.75px solid lightgray",
          }}
        >
          <h5
            style={{
              marginTop: "-0.5rem",
              marginLeft: "0.25rem",
              marginBottom: "0.25rem",
            }}
          >
            {title}
          </h5>
          <div
            onClick={setOpenPopup.bind(this, false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 12,
            }}
          >
            <AiOutlineClose style={{ height: "25px", width: "25px" }} />
          </div>
        </div>
        {/* Body */}
        <div
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            //height: "50vh",
            marginBlock: "0.25rem",
            // width: "20vw",
          }}
        >
          <div
            style={
              {
                // position: "absolute",
                // left: 0,
                // top: 0,
                // height: "100%",
                // width: "100%",
              }
            }
          >
            {children}
          </div>
        </div>
        {/* Footer */}
        <footer
          style={{ borderTop: "1px solid lightgray", paddingTop: "10px" }}
        >
          {footer}
        </footer>
      </div>
    </Wrapper>
  );
};
export default Popup;
