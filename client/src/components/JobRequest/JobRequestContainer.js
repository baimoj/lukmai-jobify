import { useState, useEffect } from "react";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAppContext } from "../../context/appContext";
import Loading from "../Loading";
import Wrapper from "../../assets/wrappers/JobRequest/JobRequestContainer";
import PageBtnContainer from "../PageBtnContainer";

const JobRequestContainer = () => {
  const {
    isLoading,
    recordsAfterPagingAndSorting,
    jobsRequest,
    getJobsRequest,
    updateJobsRequest,
    stableSort,
    getComparator,
    page,
  } = useAppContext();

  const pages = [5, 10, 20];
  // const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[1]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    return () => {
      getJobsRequest();
      // eslint-disable-next-line
    };
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobsRequest.length === 0) {
    return (
      <Wrapper>
        <h2>ไม่มี รายการ Job sample request...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {recordsAfterPagingAndSorting().length} รายการ , วันที่ ปัจจุบัน{" "}
        {moment().format("DD-MM-YYYY")}
      </h5>
      <table>
        <caption>รายการ Job sample Request</caption>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>เลขที่เอกสาร</th>
            <th>ชื่อ บริษัท</th>
            <th>วันที่ Request</th>
            <th>คำขอ โดย</th>
            <th>วันที่ ต้องการ</th>
            <th>period days</th>
            <th>actuals</th>
            <th>late</th>
            <th>status</th>
            <th>วันที่ ปิดงาน</th>
            <th>จน. ตัวอย่าง</th>
            <th>ผู้ที่รับเรื่อง</th>
            <th>ผู้ อนุมัติ</th>
            <th>action</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {/* {jobsRequest.map((item, index) => ( */}
          {stableSort(
            recordsAfterPagingAndSorting(),
            getComparator(order, orderBy)
          )
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{item.jobRequestNo}</td>
                <td>{item.jobCompanyName}</td>
                <td>{moment(item.jobRequestDate).format("DD-MM-YYYY")}</td>
                <td>{item.requestBy}</td>
                <td>{moment(item.dueDate).format("DD-MM-YYYY")}</td>
                <td>
                  {moment(moment(item.dueDate).format("YYYY-MM-DD")).diff(
                    moment(item.jobRequestDate).format("YYYY-MM-DD"),
                    "days"
                  ) + 1}
                </td>
                <td>
                  {moment(
                    moment(
                      item.status === "success" ? item.updatedAt : moment()
                    ).format("YYYY-MM-DD")
                  ).diff(
                    moment(item.jobRequestDate).format("YYYY-MM-DD"),
                    "days"
                  ) + 1}
                </td>
                <td>
                  {moment(
                    moment(
                      item.status === "success" ? item.updatedAt : moment()
                    ).format("YYYY-MM-DD")
                  ).diff(
                    moment(
                      moment().format("YYYY-MM-DD") <=
                        moment(item.dueDate).format("YYYY-MM-DD")
                        ? moment()
                        : item.dueDate
                    ).format("YYYY-MM-DD"),
                    "days"
                  )}
                </td>
                <td>
                  <div className={`chip-${item.status}`}>{item.status}</div>
                </td>
                <td>
                  {item.status === "success"
                    ? moment(item.updatedAt).locale("th").format("DD-MM-YYYY")
                    : ""}
                </td>
                <td>{item.details.length}</td>
                <td>{item.acceptBy}</td>
                <td>{item.approveBy}</td>
                <td>
                  <button
                    className="btn-action"
                    disabled={item.status === "success" ? true : false}
                    onClick={(e) => {
                      Swal.fire({
                        title: "ปิดงาน Job sample request ?",
                        text: `ต้องการ ปิดงาน เลขที่เอกสาร ${item.jobRequestNo}`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "confirm",
                        cancelButtonText: "close",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          updateJobsRequest(item).then(() => {
                            Swal.fire(
                              `ปิดงาน เลขที่ ${item.jobRequestNo} สำเร็จ!`,
                              ` ${item.acceptBy} : .... `,
                              "success"
                            ).then(() => {
                              getJobsRequest();
                            });
                          });
                        }
                      });
                    }}
                  >
                    <FaRegEdit style={{ height: "15px", width: "15px" }} />
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    style={{
                      paddingInline: "0.75rem",
                    }}
                    onClick={(e) => {}}
                  >
                    details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PageBtnContainer
        numOfPages={Math.floor(
          recordsAfterPagingAndSorting().length / rowsPerPage
        )}
      />
    </Wrapper>
  );
};

export default JobRequestContainer;
