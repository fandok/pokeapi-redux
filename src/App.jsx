import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import {
  fetchPokemonDetail,
  fetchPokemonList,
  resetDetail,
} from "./redux/pokemonSlice";

const App = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.pokemon.list);
  const detail = useSelector((state) => state.pokemon.detail);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const toggle = (url) => {
    if (url) {
      dispatch(fetchPokemonDetail(url));
    } else {
      dispatch(resetDetail());
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Container>
        {list.map((pokemon) => (
          <Card
            style={{ marginBottom: 10 }}
            key={pokemon.name}
            onClick={() => toggle(pokemon.url)}
          >
            <CardBody>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardBody>
          </Card>
        ))}
      </Container>
      <Modal toggle={() => toggle()} isOpen={isOpen}>
        <ModalHeader toggle={() => toggle()}>{detail?.name}</ModalHeader>
        <ModalBody>
          <img src={detail?.imageUrl} alt="pokemon" />
        </ModalBody>
      </Modal>
    </>
  );
};

export default App;
