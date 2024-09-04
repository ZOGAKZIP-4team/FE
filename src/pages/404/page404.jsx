
import styled from "styled-components";
import page404 from "../../assets/404.svg";

const Page404 = () => {
    return (
        <Container>
            <Image src={page404}/>
        </Container>
    )
}

export default Page404;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    width: 20%;
`;