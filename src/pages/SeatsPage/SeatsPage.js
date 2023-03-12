import FormContainer from "../../components/FormContainer"
import Chairs from "../../components/Chairs"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage(props) {

    const [selectedChairs, setSelectedChairs] = useState([]);
    const [chairs, setChairs] = useState([])
    const urlEncoded = useParams()
    const movieDay = JSON.parse(urlEncoded.idSessao)
    const { id, weekday, hours } = movieDay
    const { moviePoster, title } = props

    useEffect(() => {
        const chairUrl = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`
        const promise = axios.get(chairUrl)

        promise.then((answer) => {
            setChairs(answer.data.seats)
        })
    }, [])

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                <Chairs
                    chairs={chairs}
                    selectedChairs={selectedChairs}
                    setSelectedChairs={setSelectedChairs}
                />
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleClicked />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleAvailable />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleReserved />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer
                selectedChairs={selectedChairs}
            />

            <FooterContainer>
                <div>
                    <img src={moviePoster} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{weekday} - {hours}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircleClicked = styled.div`
    border: 1px solid #0E7D71;
    background-color: #1AAE9E;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleReserved = styled.div`
    border: 1px solid #F7C52B;
    background-color: #FBE192;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleAvailable = styled.div`
    border: 1px solid #7B8B99;
    background-color: #C3CFD9;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`