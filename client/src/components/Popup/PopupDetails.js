import React from "react";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.article`
  background: var(--background-second-color);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  transition: var(--transition);

  &:hover {
    // box-shadow: var(--hoverEffect);
  }
  header {
    /* padding: 0.25rem 0.5rem; */
    border-bottom: 2.5px solid var(--image-backgroud-color);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    h5 {
      letter-spacing: 0;
    }
  }

  .info {
    margin: 0.25rem 0.25rem;
    h5 {
      margin: 0;
      font-weight: 400;
      letter-spacing: var(--letterSpacing);
    }
    p {
      margin: 0;
      font-weight: 500;
      padding-left: 0.5rem;
      text-transform: capitalize;
      color: var(--text-second-color);
      letter-spacing: var(--letterSpacing);
      font-size: 0.85rem;
      .chip-pending {
        display: inline-block;
        margin-left: auto;
        /* padding-block: 0.25rem;*/
        padding-inline: 0.5rem;
        border-radius: 25px;
        border-collapse: collapse;
        font-family: sans-serif;
        background-color: var(--clr-red-light);
        color: var(--black);
        font-weight: bold;
      }
      .chip-success {
        display: inline-block;
        margin-left: auto;
        /* padding-block: 0.25rem;*/
        padding-inline: 0.5rem;
        border-radius: 25px;
        border-collapse: collapse;
        font-family: sans-serif;
        background-color: var(--clr-green-light);
        color: var(--black);
        font-weight: bold;
      }
    }
  }
  table {
    margin-top: 0;
    margin-bottom: 0;
    border: none;
    border-collapse: collapse;
    cursor: pointer;
    border: transparent;
    background-color: var(--backgroundColor);
    /* border-collapse: separate; */
    /* border-spacing: 5px 10px; */
    box-shadow: var(--shadow-3);
    text-transform: capitalize;
    caption-side: bottom;
    height: 100%;
    width: 100%;
    justify-content: center;
    /* letter-spacing: var(--letterSpacing); */
    /* empty-cell: show | hide;  */
    /* empty-cell is a property of table or the cells themselves */

    /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

    tbody {
      /* vertical-align: top; */
    }
    td,
    th {
      border: none;
    }
    td,
    th {
      border: 0.25px solid;
      border-color: var(--black);
      font-size: var(--small-text);
    }

    td {
      font-weight: 400;
      text-align: center;
    }

    tr:nth-child(even) {
      background-color: var(--table-even-color);
    }
    tbody tr:hover {
      // cursor: pointer;
      background-color: var(--navlink-hover);
    }
    tbody tr {
      :nth-child(odd) {
        /* background-color: var(--background-third-color); */
      }
      :hover {
      }
    }
    thead > tr {
      background-color: var(--primary-600);
      color: var(--white);
      letter-spacing: var(--letterSpacing);
      font-size: 0.85rem;
      font-weight: 400;
      font-family: "Sans-Serif";
    }

    caption {
      font-size: 0.9em;
      padding-top: 0.75rem;
      /* padding-bottom: 0.75rem; */
      font-weight: bold;
      color: var(--black);
    }
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  footer {
    margin-top: 1rem;
  }
`;

const PopupDetails = (props) => {
  const { item } = props.data;

  return (
    <div>
      {/* <>{JSON.stringify(item)}</> */}
      <Wrapper>
        <div className="info">
          <h5>เลขที่ เอกสาร : {item.jobRequestNo}</h5>
          <p className="job">บริษัท : {item.jobCompanyName}</p>
          <p className="job">
            วันที่ Request : {moment(item.jobRequestDate).format("DD-MM-YYYY")},
            คำขอ โดย : {item.requestBy}
          </p>
          <p className="job">
            วันที่ ต้องการ : {moment(item.dueDate).format("DD-MM-YYYY")}, แผนก :{" "}
            {item.department}
          </p>
          <p className="job">
            Description : {item.documentother} , status :{" "}
            <div className={`chip-${item.status}`}>{item.status}</div>
          </p>
        </div>
        <div className="divider" />
        {/* <>{JSON.stringify(item.details)}</> */}
        <section>
          {item.details.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รหัส/code</th>
                  <th>ชื่อผลิตภัณฑ์</th>
                  <th>ขนาดบรรจุ</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>ชนิดบรรจุภัณฑ์</th>
                </tr>
              </thead>
              <tbody>
                {item.details.map((data, index) => (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{data.detailCode}</td>
                    <td>{data.productName}</td>
                    <td>{data.packingSize}</td>
                    <td>{data.amount}</td>
                    <td>{data.unitType}</td>
                    <td>{data.packingType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 style={{ marginTop: "0.75rem" }}>
              ไม่มีข้อมูล รายการ ขอตัวอย่าง
            </h3>
          )}
        </section>
        <div className="divider" />
        <div className="info">
          <p className="job">
            ผู้ที่รับเรื่อง : {item.acceptBy} , วันที่ :{" "}
            {moment(item.acceptDate).format("DD-MM-YYYY")}
          </p>
          <p className="job">ผูัที่ อนุมัติ : {item.approveBy}</p>
        </div>
        <div className="divider" />
      </Wrapper>
    </div>
  );
};

export default PopupDetails;
