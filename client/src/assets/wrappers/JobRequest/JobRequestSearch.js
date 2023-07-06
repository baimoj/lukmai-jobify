import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 1rem 1rem 3rem;
  padding-bottom: 1rem;
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
      margin-top: 0.25rem;
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
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  /* @media (min-width: 768px) {
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
  } */

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
