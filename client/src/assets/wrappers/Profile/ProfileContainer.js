import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--hoverEffect);
  }
  header {
    padding: 1rem 1.5rem;
    border-bottom: 2.5px solid var(--image-backgroud-color);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    h5 {
      letter-spacing: 0;
    }
  }

  .img-container {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 0.1rem;
  }
  .person-img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
  }
  .quote-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;

    border-radius: 50%;
    transform: translateY(25%);
    background: var(--image-backgroud-color);
    color: var(--background-second-color);
  }
  .img-container::before {
    content: "";
    width: 100%;
    height: 100%;
    background: var(--image-backgroud-color);
    position: absolute;
    top: -0.25rem;
    right: -0.5rem;
    border-radius: 50%;
  }

  .info {
    margin: 0.75rem 1.75rem;
    h5 {
      margin: 0;
      font-weight: 400;
      letter-spacing: var(--letterSpacing);
    }
    p {
      margin: 0;
      padding: 0.2rem;
      /* text-transform: capitalize; */
      color: var(--text-second-color);
      letter-spacing: var(--letterSpacing);
      font-size: 0.85rem;
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

export default Wrapper;
