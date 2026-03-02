// Styles
import styled from "styled-components";
// React
// Components
// Custom hooks
import useGetData from "../api/useGetData";
// Assets
import blackCat from "../assets/black-cat.jpg";



// 
const DivHomeStyle = styled.div`
  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);

  padding: 1em;
`;
const DivAuthorBio = styled.div`
  white-space: pre-wrap;

  display: flex;
  align-items: flex-start;
  gap: 2em;

  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;

    font-size: 0.75rem;
    text-decoration: underline;

    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
  }
  & > div {
    flex: 2 1 0%;

    font-size: 0.9rem;

    /* background-color: rgba(60, 5, 111, 0.8);
    border: 2px solid rgb(58, 12, 102); */
  }
`;
const ImgStyle = styled.img`
  max-width: 100%;
  /* box-shadow: #8a2be2 0px 0px 5px, blueviolet 0px 0px 7px, blueviolet 0px 0px 10px, #FF2D95 0px 0px 10px, #FF2D95 0px 0px 15px; */
`;
const PhotoLegend = styled.span`
  margin-top: 1em;
  padding: 1em;
`;
const ParagBio = styled.p`
  text-align: start;
`;
export default function Home() {
  const endpoint = `authors`;
  const { error, loading, data } = useGetData(endpoint);
  
  let author;

  if (data) {
    author = data[0];
  }

  return (
    <DivHomeStyle>
      {loading && <p>procurando o autor...</p>}
      {author && <DivAuthorBio>
        <a href="https://www.pexels.com/photo/black-cat-walking-in-snow-6768704/">
          <ImgStyle src={blackCat} alt="Gato preto na neve." />
          <PhotoLegend>Photo by Ion Ceban  @ionelceban from Pexels.</PhotoLegend>
        </a>
        <div>
          <p>Sobre {author.firstName}</p>
          <ParagBio>{author.bio}</ParagBio>
        </div>
      </DivAuthorBio>}
    </DivHomeStyle>
  );
}