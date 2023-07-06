import styled from "styled-components";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
    margin-top: auto;
  }
  .form-input {
  }
  .form-select {
  }
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }

  .form-search-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;

    input {
      position: absolute;
      margin-top: 0.5rem;
      padding-left: 38px;

      &:focus {
        /* border-color: rgba(0, 0, 0, 0.3); */
      }
    }
    .icon-container {
      position: relative;
      border: none;
      z-index: 1;
      cursor: pointer;
      background: none;
      color: var(--image-backgroud-color);
      top: 2.5px;
      left: 12px;
      &:hover {
        /* color: var(--navlink-hover); */
        &::after {
          opacity: 1;
          transform: scale(1);
        }
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 50%;
        z-index: -1;
        background-color: #000;
        transition: 0.2s ease;
        transform: scale(0.6);
        opacity: 1;
      }
      .icon {
        margin-top: 5px;
      }
    }
  }
  .form-label {
    margin-bottom: 0.25rem;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1.25rem;
    row-gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  h5 {
    font-weight: 700;
    margin-top: 0.75rem;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }

  table {
    margin-top: -1rem;
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
      border: 0.5px solid;
      border-color: var(--black);

      font-size: var(--small-text);
    }

    td {
      font-weight: 600;
      text-align: center;

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
      color: var(--black);
      background: var(--clr-primary-7);
      letter-spacing: var(--letterSpacing);
      margin-inline: 0.25rem;
      margin-block: 0.25rem;
      padding-inline: 0.25rem;
      padding-block: 0.25rem;
      &:hover {
        background: var(--clr-primary-4);
        box-shadow: var(--shadow-3);
      }
      &:disabled {
        cursor: not-allowed !important;
        color: var(--black);
        background: var(--grey-300);
      }
    }
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
