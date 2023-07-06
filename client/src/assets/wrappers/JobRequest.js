import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 1rem 1rem 3rem;
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  &:hover {
    box-shadow: var(--hoverEffect);
  }
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.25rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    align-self: flex-end;
    margin-top: 0.75rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  table {
    margin-top: 0.75rem;
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
    width: 60%;
    justify-content: center;
    letter-spacing: var(--letterSpacing);
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
      border: 0.5px solid;
      border-color: var(--black);

      font-size: var(--small-text);
    }

    td {
      font-weight: 600;
      text-align: center;
    }

    tr:nth-child(even) {
      background-color: var(--table-even-color);
    }
    tbody tr:hover {
      cursor: pointer;
      background-color: var(--navlink-hover);
    }
    tbody tr {
      :nth-child(odd) {
        /* background-color: var(--background-third-color); */
      }
      :hover {
        /* cursor: pointer;
      background-color: var(--background-fifth-color); */
        /* cursor: pointer;
      background-color: #ff4444 !important; */
      }
    }
    thead > tr {
      background-color: var(--primary-600);
      color: var(--white);
      font-family: "Sans-Serif";
    }

    caption {
      font-size: 0.9em;
      padding-top: 0.75rem;
      /* padding-bottom: 0.75rem; */
      font-weight: bold;
      color: var(--black);
    }

    button {
      &:disabled {
        cursor: not-allowed !important;
        color: var(--black);
        background: var(--red-light);
      }
    }
  }

  @media (min-width: 864px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 0.75rem;
    }

    .btn-container {
      margin-top: 0;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
      /* align-items: center;
      column-gap: 1rem; */
    }

    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
