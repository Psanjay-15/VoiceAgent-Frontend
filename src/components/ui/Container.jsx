import styled from "styled-components";

const Container = styled.div`
  width: min(100% - 32px, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: min(100% - 22px, ${({ theme }) => theme.layout.maxWidth});
  }
`;

export default Container;
