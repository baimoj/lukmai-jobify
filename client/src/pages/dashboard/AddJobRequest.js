import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FormRow,
  FormRowSelect,
  FormRowDatetime,
  Alert,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/JobRequest";
import Checkbox from "../../components/Checkbox";
import { department } from "../../utils";
import moment from "moment";

const initState = {
  jobCompanyName: "",
  jobRequestNo: "",
  jobRequestDate: "",
  requestBy: "",
  department: "Bu1",
  costCenter: "",
  exampleProduct: "N",
  documentCOA: "N",
  documentRD: "N",
  documentother: "",
  dueDate: "",
  acceptBy: "",
  acceptDate: "",
  acceptDescription: "",
  approveBy: "",
  status: "pending",
};

const initDetails = {
  no: "",
  detailCode: "",
  productName: "",
  packingSize: "",
  amount: "",
  unitType: "",
  packingType: "",
};
const data = [
  {
    no: "1",
    detailCode: "C001",
    productName: "เก็กฮวย",
    packingSize: "10 gram",
    amount: "2",
    unitType: "kilo",
    packingType: "ถุง",
  },
  {
    no: "2",
    detailCode: "C002",
    productName: "มะลิ",
    packingSize: "10 gram",
    amount: "1",
    unitType: "kilo",
    packingType: "ถุง",
  },
];

const AddJobRequest = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlertText,
    clearValues,
    jobDocument,
    createJobRequest,
  } = useAppContext();
  const [values, setValues] = useState(initState);
  const [details, setDetails] = useState([]);
  const [detailTmp, setDetailTmp] = useState({
    productName: "",
    packingSize: "",
    amount: "",
    packingType: "",
  });

  const handleJobInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDateChange = ({ date, name }) => {
    //console.log(date);

    setValues({
      ...values,
      [name]: date,
    });
  };
  const handleDetailTmp = (e) => {
    const { name, value } = e.target;
    setDetailTmp({
      ...detailTmp,
      [name]: value,
    });
  };

  const handleDetailsInput = ({ item }) => {
    const { productName, packingSize, amount, packingType } = item;
    if ((!productName, !packingSize, !amount, !packingType)) {
      displayAlertText({
        alertType: "danger",
        alertText: "กรุณา คีย์ข้อมูล รายการ ให้ครบ ทั้ง 4 ช่อง !!!!",
      });
      return;
    }

    const total = details.length + 1;
    // console.log(total);
    const data = {
      no: total.toString(),
      detailCode: "",
      productName: productName,
      packingSize: packingSize,
      amount: amount,
      unitType: "",
      packingType: packingType,
    };

    setDetails((current) => [...current, data]);
    setDetailTmp({
      productName: "",
      packingSize: "",
      amount: "",
      packingType: "",
    });
  };

  const clearData = () => {
    setValues(initState);
    setDetails([]);
    setDetailTmp({
      productName: "",
      packingSize: "",
      amount: "",
      packingType: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      jobCompanyName,
      jobRequestNo,
      jobRequestDate,
      requestBy,
      department,
      costCenter,
      exampleProduct,
      documentCOA,
      documentRD,
      documentother,
      dueDate,
      acceptBy,
      acceptDate,
      acceptDescription,
      approveBy,
      status,
    } = values;
    if (!jobCompanyName || !jobRequestDate || !requestBy || !dueDate) {
      displayAlertText({
        alertType: "danger",
        alertText:
          "กรุณา คีย์ ชื่อ บริษัท, วันที่ Request , คำขอโดย, วันที่ต้องการ !",
      });
      return;
    }

    if (details.length === 0) {
      displayAlertText({
        alertType: "danger",
        alertText: "ไม่มีข้อมูล รายการ ขอตัวอย่าง!",
      });
      return;
    }

    const currentJobRequest = {
      jobCompanyName,
      jobRequestNo: "",
      jobRequestDate,
      requestBy,
      department,
      costCenter,
      exampleProduct,
      documentCOA,
      documentRD,
      documentother,
      dueDate,
      acceptBy,
      acceptDate,
      acceptDescription,
      approveBy,
      status,
    };
    const arrayDetails = details;
    //console.log("create job");
    createJobRequest({
      currentJobRequest,
      arrayDetails,
      endPoint: "/jobsrequest",
      clearData,
    });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job Request" : "add job sample Request"}</h3>
        <h5>
          {jobDocument
            ? `เลขที่เอกสาร  ${jobDocument} ที่สร้าง สำเร็จ!`
            : "..."}
        </h5>
        {/* <h6>{JSON.stringify(values)}</h6> */}
        {/* <h6>{JSON.stringify(detailTmp)}</h6> */}
        {/* <h6>{JSON.stringify(details)}</h6> */}
        {/* <label className="form-label">
          isEditing {isEditing ? "true" : "false"},Job id: {editJobId}
        </label> */}
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="*ชื่อ บริษัท"
            name="jobCompanyName"
            value={values.jobCompanyName}
            handleChange={handleJobInput}
          />

          <FormRowDatetime
            labelText="*วันที่ Request"
            name="jobRequestDate"
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            selected={values.jobRequestDate}
            disabledKeyboardNavigation
            todayButton={"Today"}
            selectsStart
            startDate={values.jobRequestDate}
            endDate={values.dueDate}
            withPortal
            onChange={(date) =>
              handleDateChange({ date, name: "jobRequestDate" })
            }
          />
          <FormRow
            type="text"
            labelText="*คำขอ โดย"
            name="requestBy"
            value={values.requestBy}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            labelText="แผนก/ฝ่าย Department"
            name="department"
            value={values.department || ""}
            handleChange={handleJobInput}
            list={department}
          />
          <FormRow
            type="text"
            labelText="รหัสแผนก costCenter"
            name="costCenter"
            value={values.costCenter}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            labelText="รายละเอียด อื่นๆ"
            name="documentother"
            value={values.documentother}
            handleChange={handleJobInput}
          />
          <FormRowDatetime
            labelText="*วันที่ ต้องการ"
            name="dueDate"
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            selected={values.dueDate}
            disabledKeyboardNavigation
            todayButton={"Today"}
            selectsEnd
            startDate={values.jobRequestDate}
            endDate={values.dueDate}
            minDate={values.jobRequestDate}
            withPortal
            onChange={(date) => handleDateChange({ date, name: "dueDate" })}
          />
          <div
            style={{
              marginTop: "3.25rem",
              marginLeft: "0.75rem",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              textAlign: "left",
              color: "red",
            }}
          >
            <h5>
              *** ระยะ เวลา รวม{" "}
              {values.jobRequestDate && values.dueDate
                ? moment(moment(values.dueDate).format("YYYY-MM-DD")).diff(
                    moment(values.jobRequestDate).format("YYYY-MM-DD"),
                    "days"
                  ) + 1
                : "..."}{" "}
              วัน
            </h5>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            marginTop: "0.25rem",
            paddingLeft: "0.75rem",
          }}
        >
          <div>
            <Checkbox
              label="ตัวอย่าง วัตถุดิบ"
              value={values.exampleProduct}
              checked={values.exampleProduct === "Y" ? true : false}
              onChange={(e) =>
                setValues({
                  ...values,
                  exampleProduct: values.exampleProduct === "Y" ? "N" : "Y",
                })
              }
            />
            <Checkbox
              label="เอกสาร COA"
              value={values.documentCOA}
              checked={values.documentCOA === "Y" ? true : false}
              onChange={(e) =>
                setValues({
                  ...values,
                  documentCOA: values.documentCOA === "Y" ? "N" : "Y",
                })
              }
            />
            <Checkbox
              label="เอกสาร RD"
              value={values.documentRD}
              checked={values.documentRD === "Y" ? true : false}
              onChange={(e) =>
                setValues({
                  ...values,
                  documentRD: values.documentRD === "Y" ? "N" : "Y",
                })
              }
            />
          </div>
        </div>
        <div className="divider" />
        <div className="form-center">
          <FormRow
            type="text"
            labelText="ชื่อผลิตภัณฑ์"
            name="productName"
            value={detailTmp.productName}
            handleChange={handleDetailTmp}
          />
          <FormRow
            type="text"
            labelText="ขนาดบรรจุ"
            name="packingSize"
            value={detailTmp.packingSize}
            handleChange={handleDetailTmp}
          />
          <FormRow
            type="text"
            labelText="จำนวน"
            name="amount"
            value={detailTmp.amount}
            handleChange={handleDetailTmp}
          />
          <FormRow
            type="text"
            labelText="ชนิด บรรจุภัณฑ์"
            name="packingType"
            value={detailTmp.packingType}
            handleChange={handleDetailTmp}
          />
          <div className="btn-container" style={{ marginTop: "0.5rem" }}>
            <button
              className="btn btn-block "
              type="button"
              onClick={(e) => handleDetailsInput({ item: detailTmp })}
              disabled={isLoading}
            >
              เพิ่ม (รายการ)
            </button>
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={(e) => {
                setDetailTmp({
                  productName: "",
                  packingSize: "",
                  amount: "",
                  packingType: "",
                });
              }}
            >
              ล้าง
            </button>
          </div>
        </div>
        {details.length > 0 ? (
          <table>
            <caption>lukmai table Job Request</caption>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รหัส/code</th>
                <th>ชื่อผลิตภัณฑ์</th>
                <th>ขนาดบรรจุ</th>
                <th>จำนวน</th>
                <th>หน่วย</th>
                <th>ชนิดบรรจุภัณฑ์</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, index) => (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{item.detailCode}</td>
                  <td>{item.productName}</td>
                  <td>{item.packingSize}</td>
                  <td>{item.amount}</td>
                  <td>{item.unitType}</td>
                  <td>{item.packingType}</td>
                  <td>
                    <button
                      className="btn-action"
                      type="button"
                      onClick={(e) => {
                        Swal.fire({
                          title: "ลบ รายการ ?",
                          text: `ต้องการ ลบ รายการ ${item.productName}`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "ลบ",
                          cancelButtonText: "ยกเลิก",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            const array = [...details];
                            const index = array.indexOf(item);
                            if (index !== -1) {
                              array.splice(index, 1);
                              setDetails(array);
                            }
                          }
                        });
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 style={{ marginTop: "0.75rem" }}>
            ไม่มีข้อมูล รายการ ขอตัวอย่าง
          </h3>
        )}
        <div className="divider" />
        <div className="form-center">
          <FormRow
            type="text"
            labelText="ผู้ที่รับเรื่อง"
            name="acceptBy"
            value={values.acceptBy}
            handleChange={handleJobInput}
          />
          <FormRowDatetime
            labelText="วันที่ ที่รับเรื่อง"
            name="acceptDate"
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            selected={values.acceptDate}
            disabledKeyboardNavigation
            todayButton={"Today"}
            withPortal
            onChange={(date) => handleDateChange({ date, name: "acceptDate" })}
          />
          <FormRow
            type="text"
            labelText="ผู้ อนุมัติ"
            name="approveBy"
            value={values.approveBy}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelText="สถานะ"
            name="status"
            value={values.status}
            handleChange={handleJobInput}
            disabled
            list={[
              { id: "pending", title: "pending" },
              { id: "pending", title: "success" },
            ]}
          />
          <div className="btn-container" style={{ marginTop: "0.5rem" }}>
            <button
              className="btn btn-block "
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              บันทึก
            </button>
            <button
              className="btn btn-block clear-btn"
              //type="button"
              onClick={(e) => {
                e.preventDefault();
                clearData();
                clearValues();
              }}
            >
              ล้าง
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJobRequest;
